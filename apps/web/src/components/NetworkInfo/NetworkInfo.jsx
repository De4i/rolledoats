export function NetworkInfo() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
      <h3 className="text-lg font-bold text-blue-800 mb-3">
        IOPN Testnet Information
      </h3>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <p>
            <span className="font-medium text-blue-700">RPC URL:</span>{" "}
            https://testnet-rpc.iopn.tech/
          </p>
          <p>
            <span className="font-medium text-blue-700">Chain ID:</span> 984
          </p>
        </div>
        <div>
          <p>
            <span className="font-medium text-blue-700">Native Token:</span> OPN
          </p>
          <p>
            <span className="font-medium text-blue-700">Explorer:</span>{" "}
            testnet.iopn.tech
          </p>
        </div>
      </div>
    </div>
  );
}
