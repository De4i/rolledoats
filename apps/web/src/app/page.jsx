import { useState, useEffect } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useSwap } from "@/hooks/useSwap";
import { useLiquidity } from "@/hooks/useLiquidity";
import { Header } from "@/components/Header/Header";
import { Navigation } from "@/components/Navigation/Navigation";
import { SwapTab } from "@/components/SwapTab/SwapTab";
import { LiquidityTab } from "@/components/LiquidityTab/LiquidityTab";
import { FarmingTab } from "@/components/FarmingTab/FarmingTab";
import { HistoryTab } from "@/components/HistoryTab/HistoryTab";
import { TokenList } from "@/components/TokenList/TokenList";
import { NetworkInfo } from "@/components/NetworkInfo/NetworkInfo";
import { Footer } from "@/components/Footer/Footer";

export default function OatsSwap() {
  const { account, balances, provider, signer, connectWallet, loadBalances } =
    useWallet();
  const [activeTab, setActiveTab] = useState("swap");
  const [showSlippageSettings, setShowSlippageSettings] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const {
    swapForm,
    setSwapForm,
    slippage,
    setSlippage,
    isLoading: swapLoading,
    handleSwap: executeSwap,
  } = useSwap(provider, signer, account, loadBalances);

  const {
    liquidityForm,
    setLiquidityForm,
    isLoading: liquidityLoading,
    handleAddLiquidity: executeLiquidity,
  } = useLiquidity(signer, provider, account, loadBalances);

  const handleSwap = async () => {
    const result = await executeSwap();
    if (result) {
      setTransactions((prev) => [result, ...prev]);
    }
  };

  const handleAddLiquidity = async () => {
    const result = await executeLiquidity();
    if (result) {
      setTransactions((prev) => [result, ...prev]);
    }
  };

  // Load ethers.js from CDN
  useEffect(() => {
    if (typeof window !== "undefined" && !window.ethers) {
      const script = document.createElement("script");
      script.src = "https://cdn.ethers.io/lib/ethers-5.7.2.umd.min.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log("Ethers.js loaded");
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Header
        account={account}
        balances={balances}
        connectWallet={connectWallet}
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="p-6">
            {activeTab === "swap" && (
              <SwapTab
                account={account}
                balances={balances}
                swapForm={swapForm}
                setSwapForm={setSwapForm}
                slippage={slippage}
                setSlippage={setSlippage}
                showSlippageSettings={showSlippageSettings}
                setShowSlippageSettings={setShowSlippageSettings}
                isLoading={swapLoading}
                handleSwap={handleSwap}
              />
            )}

            {activeTab === "liquidity" && (
              <LiquidityTab
                account={account}
                balances={balances}
                liquidityForm={liquidityForm}
                setLiquidityForm={setLiquidityForm}
                handleAddLiquidity={handleAddLiquidity}
              />
            )}

            {activeTab === "farming" && <FarmingTab />}

            {activeTab === "history" && (
              <HistoryTab transactions={transactions} />
            )}
          </div>
        </div>

        <TokenList balances={balances} />
        <NetworkInfo />
      </main>

      <Footer />
    </div>
  );
}
