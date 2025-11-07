import { contracts } from "@/constants/contracts";

export function TokenList({ balances }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Available Tokens</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(contracts).map(([symbol, token]) => (
          <div
            key={symbol}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="font-bold text-lg">{symbol}</div>
              <div
                className={`w-3 h-3 rounded-full ${symbol === "OPN" ? "bg-blue-500" : symbol === "IDR" ? "bg-green-500" : "bg-gray-400"}`}
              ></div>
            </div>
            <div className="text-sm text-gray-600 mb-3">{token.name}</div>
            <div className="text-lg font-medium text-gray-900">
              {balances[symbol] ? balances[symbol] : "0.00"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {symbol === "OPN"
                ? "Native Token"
                : symbol === "IDR"
                  ? "Stable Coin"
                  : "ERC-20 Token"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
