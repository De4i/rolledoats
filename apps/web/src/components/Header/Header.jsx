export function Header({ account, balances, connectWallet }) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center text-2xl">
              🌾
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Oats Swap</h1>
              <p className="text-sm text-gray-600">AMM DEX for IOPN testnet</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="text-sm text-gray-600">IOPN Testnet</p>
              <p className="text-xs text-gray-500">Chain ID: 984</p>
            </div>
            {account ? (
              <div className="bg-green-100 px-4 py-2 rounded-lg">
                <p className="text-sm font-medium text-green-800">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </p>
                <p className="text-xs text-green-600">
                  Balance: {balances.OPN || "0.00"} OPN
                </p>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
