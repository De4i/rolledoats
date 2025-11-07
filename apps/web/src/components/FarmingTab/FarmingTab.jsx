const farms = [
  {
    pair: "OPN/JKT",
    apy: "850%",
    tvl: "$12,450",
    userStaked: "0.00",
  },
  {
    pair: "JKT/SBY",
    apy: "720%",
    tvl: "$8,320",
    userStaked: "0.00",
  },
  {
    pair: "BALI/IDR",
    apy: "1000%",
    tvl: "$15,600",
    userStaked: "0.00",
  },
  {
    pair: "BGR/BDG",
    apy: "450%",
    tvl: "$6,780",
    userStaked: "0.00",
  },
  {
    pair: "IDN/IDR",
    apy: "320%",
    tvl: "$25,400",
    userStaked: "0.00",
  },
  {
    pair: "SBY/BALI",
    apy: "600%",
    tvl: "$4,250",
    userStaked: "0.00",
  },
];

export function FarmingTab() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Yield Farming Pools</h2>
      <div className="grid gap-4">
        {farms.map((farm, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">{farm.pair}</h3>
                <div className="flex space-x-4 mt-2 text-sm text-gray-600">
                  <p>
                    TVL: <span className="font-medium">{farm.tvl}</span>
                  </p>
                  <p>
                    Your Stake:{" "}
                    <span className="font-medium">{farm.userStaked} LP</span>
                  </p>
                </div>
              </div>
              <div className="text-right mr-4">
                <div className="text-2xl font-bold text-green-600">
                  {farm.apy}
                </div>
                <p className="text-sm text-gray-600">APY</p>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() =>
                    alert(
                      `Farming for ${farm.pair} will be available once liquidity pools are deployed!`,
                    )
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium transition-colors"
                >
                  Farm
                </button>
                <button
                  onClick={() =>
                    alert(
                      `Harvest rewards for ${farm.pair} will be available once you start farming!`,
                    )
                  }
                  className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 font-medium text-sm transition-colors"
                >
                  Harvest
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 font-medium">⚠️ Yield Farming Notice</p>
        <p className="text-yellow-700 text-sm mt-1">
          High APY rates are for demonstration. Actual rates will vary based on
          pool liquidity and market conditions.
        </p>
      </div>
    </div>
  );
}
