import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Percent
} from "lucide-react";

export default function SummaryCards({ summary, currencySymbol }) {
  const isProfit = summary?.profitLoss >= 0;

  const cards = [
    {
      title: "Investment",
      value: `${currencySymbol}${summary?.investment || 0}`,
      icon: Wallet,
      color: "text-blue-500"
    },
    {
      title: "Current Value",
      value: `${currencySymbol}${summary?.currentValue || 0}`,
      icon: Wallet,
      color: "text-indigo-500"
    },
    {
      title: "Profit / Loss",
      value: `${currencySymbol}${summary?.profitLoss || 0}`,
      icon: isProfit ? TrendingUp : TrendingDown,
      color: isProfit ? "text-green-500" : "text-red-500"
    },
    {
      title: "Return %",
      value: `${summary?.returnPct || 0}%`,
      icon: Percent,
      color: summary?.returnPct >= 0 ? "text-green-500" : "text-red-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm text-gray-500 font-medium">
                {card.title}
              </h3>
              <Icon className={`w-5 h-5 ${card.color}`} />
            </div>

            {/* Value */}
            <p className={`text-2xl font-bold ${card.color}`}>
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}