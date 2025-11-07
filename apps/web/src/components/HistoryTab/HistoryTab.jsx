import { History } from "lucide-react";

export function HistoryTab({ transactions }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Transaction History</h2>
      {transactions.length > 0 ? (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-gray-50 p-4 rounded-xl border hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium capitalize">
                      {tx.type.replace("_", " ")}
                    </span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                      {tx.hash}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {tx.type === "swap"
                      ? `${tx.fromAmount} ${tx.from} → ${tx.toAmount} ${tx.to}`
                      : `${tx.amountA} ${tx.tokenA} + ${tx.amountB} ${tx.tokenB}`}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {tx.timestamp}
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    tx.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : tx.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {tx.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <History className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg">No transactions yet</p>
          <p className="text-sm">
            Start swapping or adding liquidity to see your history here
          </p>
        </div>
      )}
    </div>
  );
}
