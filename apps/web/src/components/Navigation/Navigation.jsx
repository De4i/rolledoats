import { ArrowDownUp, Plus, History } from "lucide-react";

export function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "swap", name: "Swap", icon: ArrowDownUp },
    { id: "liquidity", name: "Liquidity", icon: Plus },
    { id: "farming", name: "Yield Farming", icon: "🌾" },
    { id: "history", name: "History", icon: History },
  ];

  return (
    <div className="border-b">
      <nav className="flex space-x-8 px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {typeof tab.icon === "string" ? (
              <span className="text-lg">{tab.icon}</span>
            ) : (
              <tab.icon className="w-4 h-4" />
            )}
            <span>{tab.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
