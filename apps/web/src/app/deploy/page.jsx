import { useState } from "react";

export default function DeployPage() {
  const [privateKey, setPrivateKey] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployResult, setDeployResult] = useState(null);
  const [error, setError] = useState("");

  const handleDeploy = async () => {
    if (!privateKey) {
      setError("Please enter your private key");
      return;
    }

    setIsDeploying(true);
    setError("");

    try {
      const response = await fetch("/api/deploy-contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ privateKey }),
      });

      const result = await response.json();

      if (result.success) {
        setDeployResult(result);
      } else {
        setError(result.error || "Deployment failed");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    }

    setIsDeploying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Deploy IOPN Tokens</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Private Key (IOPN Testnet)
              </label>
              <input
                type="password"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0x..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Your private key is only used locally to deploy contracts
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isDeploying ? "Deploying..." : "Deploy All Tokens"}
            </button>

            {deployResult && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-green-800 mb-2">
                  Deployment Successful! 🎉
                </h3>

                <div className="space-y-2 text-sm">
                  <p>
                    <strong>SimpleSwap:</strong>{" "}
                    {deployResult.contracts.SimpleSwap}
                  </p>

                  <div className="mt-3">
                    <p className="font-medium">Token Contracts:</p>
                    {Object.entries(deployResult.contracts.tokens).map(
                      ([symbol, address]) => (
                        <p key={symbol} className="ml-2">
                          <strong>{symbol}:</strong> {address}
                        </p>
                      ),
                    )}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded">
                  <p className="text-blue-800 text-sm">
                    📋 Copy these addresses to your environment variables to use
                    in the DEX!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-bold text-blue-800 mb-2">
            Token Supply Information
          </h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• JKT, SBY, BALI, BGR, BDG: 1,000,000,000 tokens each</p>
            <p>• IDN: 5,000,000 tokens</p>
            <p>• IDR (Stablecoin): 10,000,000,000 tokens</p>
            <p>• All tokens will be minted to your wallet address</p>
          </div>
        </div>
      </div>
    </div>
  );
}
