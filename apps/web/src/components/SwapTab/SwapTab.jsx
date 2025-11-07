import { Settings, ArrowDownUp } from "lucide-react";
import { contracts, SWAP_CONTRACT } from "@/constants/contracts";

export function SwapTab({
  account,
  balances,
  swapForm,
  setSwapForm,
  slippage,
  setSlippage,
  showSlippageSettings,
  setShowSlippageSettings,
  isLoading,
  handleSwap,
}) {
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Swap Tokens</h2>
        <button
          onClick={() => setShowSlippageSettings(!showSlippageSettings)}
          className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {showSlippageSettings && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slippage Tolerance: {slippage}%
          </label>
          <div className="flex space-x-2">
            {[0.1, 0.5, 1.0].map((value) => (
              <button
                key={value}
                onClick={() => setSlippage(value)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  slippage === value
                    ? "bg-blue-100 text-blue-600 border border-blue-200"
                    : "bg-white border hover:bg-gray-50"
                }`}
              >
                {value}%
              </button>
            ))}
            <input
              type="number"
              step="0.1"
              min="0.1"
              max="50"
              value={slippage}
              onChange={(e) => setSlippage(parseFloat(e.target.value) || 0.5)}
              className="w-20 px-2 py-1 text-sm border rounded"
              placeholder="Custom"
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* From Token */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">From</span>
            <span className="text-sm text-gray-600">
              Balance: {balances[swapForm.fromToken] || "0.00"}
            </span>
          </div>
          <div className="flex space-x-3">
            <select
              value={swapForm.fromToken}
              onChange={(e) =>
                setSwapForm((prev) => ({
                  ...prev,
                  fromToken: e.target.value,
                }))
              }
              className="bg-white border rounded-lg px-3 py-2 font-medium min-w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(contracts).map(([symbol, token]) => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>
            <input
              type="number"
              step="0.000001"
              min="0"
              placeholder="0.0"
              value={swapForm.fromAmount}
              onChange={(e) =>
                setSwapForm((prev) => ({
                  ...prev,
                  fromAmount: e.target.value,
                }))
              }
              className="flex-1 bg-transparent text-xl font-medium outline-none"
            />
          </div>
        </div>

        {/* Swap Direction Arrow */}
        <div className="flex justify-center">
          <button
            onClick={() =>
              setSwapForm((prev) => ({
                ...prev,
                fromToken: prev.toToken,
                toToken: prev.fromToken,
                fromAmount: prev.toAmount,
                toAmount: prev.fromAmount,
              }))
            }
            className="p-2 bg-white border-2 border-gray-200 rounded-full hover:border-blue-300 transition-colors"
          >
            <ArrowDownUp className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* To Token */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">To (estimated)</span>
            <span className="text-sm text-gray-600">
              Balance: {balances[swapForm.toToken] || "0.00"}
            </span>
          </div>
          <div className="flex space-x-3">
            <select
              value={swapForm.toToken}
              onChange={(e) =>
                setSwapForm((prev) => ({
                  ...prev,
                  toToken: e.target.value,
                }))
              }
              className="bg-white border rounded-lg px-3 py-2 font-medium min-w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(contracts).map(([symbol, token]) => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="0.0"
              value={swapForm.toAmount}
              readOnly
              className="flex-1 bg-transparent text-xl font-medium outline-none text-gray-600"
            />
          </div>
        </div>

        {swapForm.fromAmount && (
          <div className="text-sm text-gray-600 px-2">
            <p>
              Exchange Rate: 1 {swapForm.fromToken} ≈ 0.98 {swapForm.toToken}
            </p>
            <p>Slippage Tolerance: {slippage}%</p>
          </div>
        )}

        <button
          onClick={handleSwap}
          disabled={
            !account ||
            !swapForm.fromAmount ||
            swapForm.fromToken === swapForm.toToken ||
            isLoading ||
            !SWAP_CONTRACT
          }
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {!account
            ? "Connect Wallet"
            : !SWAP_CONTRACT
              ? "Contract Not Deployed"
              : swapForm.fromToken === swapForm.toToken
                ? "Select Different Tokens"
                : isLoading
                  ? "Swapping..."
                  : "Swap"}
        </button>
      </div>
    </div>
  );
}
