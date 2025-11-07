import { useState, useCallback } from "react";
import {
  contracts,
  SWAP_CONTRACT,
  SWAP_ABI,
  ERC20_ABI,
} from "@/constants/contracts";

export function useLiquidity(signer, provider, account, loadBalances) {
  const [liquidityForm, setLiquidityForm] = useState({
    tokenA: "OPN",
    tokenB: "JKT",
    amountA: "",
    amountB: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddLiquidity = useCallback(async () => {
    if (
      !signer ||
      !liquidityForm.amountA ||
      !liquidityForm.amountB ||
      !SWAP_CONTRACT
    )
      return;

    setIsLoading(true);
    try {
      const swapContract = new window.ethers.Contract(
        SWAP_CONTRACT,
        SWAP_ABI,
        signer,
      );
      const tokenA = contracts[liquidityForm.tokenA];
      const tokenB = contracts[liquidityForm.tokenB];

      const amountA = window.ethers.parseEther(liquidityForm.amountA);
      const amountB = window.ethers.parseEther(liquidityForm.amountB);

      // Approve tokens if not native
      if (tokenA.symbol !== "OPN") {
        const tokenAContract = new window.ethers.Contract(
          tokenA.address,
          ERC20_ABI,
          signer,
        );
        const approveTx = await tokenAContract.approve(SWAP_CONTRACT, amountA);
        await approveTx.wait();
      }

      if (tokenB.symbol !== "OPN") {
        const tokenBContract = new window.ethers.Contract(
          tokenB.address,
          ERC20_ABI,
          signer,
        );
        const approveTx = await tokenBContract.approve(SWAP_CONTRACT, amountB);
        await approveTx.wait();
      }

      const tx = await swapContract.addLiquidity(
        tokenA.address,
        tokenB.address,
        amountA,
        amountB,
      );
      await tx.wait();

      // Reload balances
      await loadBalances(provider, account);

      // Reset form
      setLiquidityForm({
        tokenA: liquidityForm.tokenA,
        tokenB: liquidityForm.tokenB,
        amountA: "",
        amountB: "",
      });

      alert("Liquidity added successfully!");

      return {
        id: Date.now(),
        type: "add_liquidity",
        tokenA: liquidityForm.tokenA,
        tokenB: liquidityForm.tokenB,
        amountA: liquidityForm.amountA,
        amountB: liquidityForm.amountB,
        timestamp: new Date().toLocaleString(),
        status: "completed",
        hash: tx.hash,
      };
    } catch (error) {
      console.error("Add liquidity failed:", error);
      alert("Adding liquidity failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }, [signer, liquidityForm, provider, account, loadBalances]);

  return {
    liquidityForm,
    setLiquidityForm,
    isLoading,
    handleAddLiquidity,
  };
}
