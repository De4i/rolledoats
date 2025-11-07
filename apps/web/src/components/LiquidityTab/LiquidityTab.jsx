import { Plus } from "lucide-react";
import { contracts } from "@/constants/contracts";

export function LiquidityTab({
  account,
  balances,
  liquidityForm,
  setLiquidityForm,
  handleAddLiquidity,
}) {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-6">Add Liquidity</h2>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">First Token</span>
            <span className="text-sm text-gray-600">
              Balance: {balances[liquidityForm.tokenA] || "0.00"}
            </span>
          </div>
          <div className="flex space-x-3">
            <select
              value={liquidityForm.tokenA}
              onChange={(e) =>
                setLiquidityForm((prev) => ({
                  ...prev,
                  tokenA: e.target.value,
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
              value={liquidityForm.amountA}
              onChange={(e) =>
                setLiquidityForm((prev) => ({
                  ...prev,
                  amountA: e.target.value,
                }))
              }
              className="flex-1 bg-transparent text-xl font-medium outline-none"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Plus className="w-5 h-5 text-gray-400" />
        </div>

        <div className="bg-gray-50 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Second Token</span>
            <span className="text-sm text-gray-600">
              Balance: {balances[liquidityForm.tokenB] || "0.00"}
            </span>
          </div>
          <div className="flex space-x-3">
            <select
              value={liquidityForm.tokenB}
              onChange={(e) =>
                setLiquidityForm((prev) => ({
                  ...prev,
                  tokenB: e.target.value,
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
              value={liquidityForm.amountB}
              onChange={(e) =>
                setLiquidityForm((prev) => ({
                  ...prev,
                  amountB: e.target.value,
                }))
              }
              className="flex-1 bg-transparent text-xl font-medium outline-none"
            />
          </div>
        </div>

        {liquidityForm.amountA && liquidityForm.amountB && (
          <div className="bg-blue-50 p-3 rounded-lg text-sm">
            <p className="font-medium text-blue-800 mb-1">
              Liquidity Pool Details:
            </p>
            <p className="text-blue-700">
              You will receive LP tokens representing your share
            </p>
            <p className="text-blue-700">
              Pool Share: ~
              {(
                ((parseFloat(liquidityForm.amountA) +
                  parseFloat(liquidityForm.amountB)) /
                  1000) *
                100
              ).toFixed(2)}
              %
            </p>
          </div>
        )}

        <button
          onClick={handleAddLiquidity}
          disabled={
            !account ||
            !liquidityForm.amountA ||
            !liquidityForm.amountB ||
            liquidityForm.tokenA === liquidityForm.tokenB
          }
          className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {!account
            ? "Connect Wallet"
            : liquidityForm.tokenA === liquidityForm.tokenB
              ? "Select Different Tokens"
              : "Add Liquidity"}
        </button>
      </div>
    </div>
  );
}
