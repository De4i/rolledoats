import { useState, useCallback } from "react";
import { contracts } from "@/constants/contracts";
import { ERC20_ABI } from "@/constants/contracts";

export function useWallet() {
  const [account, setAccount] = useState("");
  const [balances, setBalances] = useState({});
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const loadBalances = useCallback(async (web3Provider, address) => {
    try {
      const newBalances = {};

      // Get native OPN balance
      const balance = await web3Provider.getBalance(address);
      newBalances.OPN = window.ethers.formatEther(balance);

      // Get ERC-20 token balances
      for (const [symbol, contract] of Object.entries(contracts)) {
        if (symbol !== "OPN" && contract.address) {
          try {
            const tokenContract = new window.ethers.Contract(
              contract.address,
              ERC20_ABI,
              web3Provider,
            );
            const tokenBalance = await tokenContract.balanceOf(address);
            newBalances[symbol] = window.ethers.formatEther(tokenBalance);
          } catch (error) {
            console.error(`Failed to load ${symbol} balance:`, error);
            newBalances[symbol] = "0.00";
          }
        }
      }

      setBalances(newBalances);
    } catch (error) {
      console.error("Failed to load balances:", error);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Use ethers.js v6 syntax
        const web3Provider = new window.ethers.BrowserProvider(window.ethereum);
        const network = await web3Provider.getNetwork();

        if (network.chainId !== 984n) {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x3d8" }],
            });
          } catch (switchError) {
            if (switchError.code === 4902) {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x3d8",
                    chainName: "IOPN Testnet",
                    nativeCurrency: {
                      name: "OPN",
                      symbol: "OPN",
                      decimals: 18,
                    },
                    rpcUrls: ["https://testnet-rpc.iopn.tech/"],
                    blockExplorerUrls: ["https://testnet.iopn.tech/"],
                  },
                ],
              });
            }
          }
        }

        const signerInstance = await web3Provider.getSigner();
        const address = await signerInstance.getAddress();

        setProvider(web3Provider);
        setSigner(signerInstance);
        setAccount(address);

        await loadBalances(web3Provider, address);
      } else {
        alert("Please install MetaMask or another Web3 wallet");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  }, [loadBalances]);

  return {
    account,
    balances,
    provider,
    signer,
    connectWallet,
    loadBalances,
  };
}
