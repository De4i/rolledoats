import { useState, useCallback, useEffect } from "react";
import {
  contracts,
  SWAP_CONTRACT,
  SWAP_ABI,
  ERC20_ABI,
} from "@/constants/contracts";

export function useSwap(provider, signer, account, loadBalances) {
  const [swapForm, setSwapForm] = useState({
    fromToken: "OPN",
    toToken: "JKT",
    fromAmount: "",
    toAmount: "",
  });
  const [slippage, setSlippage] = useState(0.5);
  const [isLoading, setIsLoading] = useState(false);

  const calculateSwapOutput = useCallback(
    async (fromAmount, fromToken, toToken) => {
      if (!fromAmount || fromAmount === "0" || !provider || !SWAP_CONTRACT)
        return "";

      try {
        const swapContract = new window.ethers.Contract(
          SWAP_CONTRACT,
          SWAP_ABI,
          provider,
        );
        const fromContract = contracts[fromToken];
        const toContract = contracts[toToken];

        const amountIn = window.ethers.parseEther(fromAmount);
        const amountOut = await swapContract.getAmountOut(
          fromContract.address,
          toContract.address,
          amountIn,
        );

        return window.ethers.formatEther(amountOut);
      } catch (error) {
        console.error("Failed to calculate swap output:", error);
        // Fallback to simple calculation
        const rate = 0.98;
        return (parseFloat(fromAmount) * rate).toFixed(6);
      }
    },
    [provider],
  );

  const handleSwap = useCallback(async () => {
    if (!signer || !swapForm.fromAmount || !swapForm.toAmount || !SWAP_CONTRACT)
      return;

    setIsLoading(true);
    try {
      const swapContract = new window.ethers.Contract(
        SWAP_CONTRACT,
        SWAP_ABI,
        signer,
      );
      const fromToken = contracts[swapForm.fromToken];
      const toToken = contracts[swapForm.toToken];

      const amountIn = window.ethers.parseEther(swapForm.fromAmount);
      const minAmountOut = window.ethers.parseEther(
        ((parseFloat(swapForm.toAmount) * (100 - slippage)) / 100).toString(),
      );

      let tx;

      if (fromToken.symbol === "OPN") {
        // Swap ETH for tokens
        tx = await swapContract.swapETHForTokens(
          toToken.address,
          minAmountOut,
          {
            value: amountIn,
          },
        );
      } else if (toToken.symbol === "OPN") {
        // Approve token first
        const tokenContract = new window.ethers.Contract(
          fromToken.address,
          ERC20_ABI,
          signer,
        );
        const approveTx = await tokenContract.approve(SWAP_CONTRACT, amountIn);
        await approveTx.wait();

        // Swap tokens for ETH
        tx = await swapContract.swapTokensForETH(
          fromToken.address,
          amountIn,
          minAmountOut,
        );
      } else {
        // Approve token first
        const tokenContract = new window.ethers.Contract(
          fromToken.address,
          ERC20_ABI,
          signer,
        );
        const approveTx = await tokenContract.approve(SWAP_CONTRACT, amountIn);
        await approveTx.wait();

        // Swap tokens for tokens
        tx = await swapContract.swap(
          fromToken.address,
          toToken.address,
          amountIn,
          minAmountOut,
        );
      }

      await tx.wait();

      // Reload balances
      await loadBalances(provider, account);

      // Reset form
      setSwapForm({
        fromToken: swapForm.fromToken,
        toToken: swapForm.toToken,
        fromAmount: "",
        toAmount: "",
      });

      alert("Swap completed successfully!");

      return {
        id: Date.now(),
        type: "swap",
        from: swapForm.fromToken,
        to: swapForm.toToken,
        fromAmount: swapForm.fromAmount,
        toAmount: swapForm.toAmount,
        timestamp: new Date().toLocaleString(),
        status: "completed",
        hash: tx.hash,
      };
    } catch (error) {
      console.error("Swap failed:", error);
      alert("Swap failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }, [signer, swapForm, slippage, provider, account, loadBalances]);

  // Auto-calculate swap output when input changes
  useEffect(() => {
    if (swapForm.fromAmount && swapForm.fromToken !== swapForm.toToken) {
      calculateSwapOutput(
        swapForm.fromAmount,
        swapForm.fromToken,
        swapForm.toToken,
      ).then((output) => {
        setSwapForm((prev) => ({ ...prev, toAmount: output }));
      });
    }
  }, [
    swapForm.fromAmount,
    swapForm.fromToken,
    swapForm.toToken,
    calculateSwapOutput,
  ]);

  return {
    swapForm,
    setSwapForm,
    slippage,
    setSlippage,
    isLoading,
    handleSwap,
  };
}
