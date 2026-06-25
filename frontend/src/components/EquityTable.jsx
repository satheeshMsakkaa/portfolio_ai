import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Landmark,
  Hash
} from "lucide-react";

export default function EquityTable({ equities = [], currencySymbol }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 overflow-x-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <BarChart3 className="text-blue-500 w-6 h-6" />
        <h2 className="text-lg font-bold">Equity Holdings</h2>
      </div>

      <table className="w-full text-sm border-separate border-spacing-y-2">
        {/* Header */}
        <thead>
          <tr className="text-left text-gray-600">
            <th className="p-3">Stock</th>
            <th className="p-3">Qty</th>
            <th className="p-3">Avg Price</th>
            <th className="p-3">Current Price</th>
            <th className="p-3">Investment</th>
            <th className="p-3">Current Value</th>
            <th className="p-3">P/L</th>
            <th className="p-3">Return %</th>
            <th className="p-3">Exchange</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {equities.map((s, i) => {
            const isProfit = s.ProfitLoss >= 0;

            return (
              <tr
                key={i}
                className="bg-gray-50 hover:bg-gray-100 transition"
              >
                {/* Symbol */}
                <td className="p-3 rounded-l-lg">
                  <div className="flex items-center gap-2 font-semibold">
                    <Hash className="w-4 h-4 text-gray-400" />
                    {s.Symbol}
                  </div>
                </td>

                {/* Quantity */}
                <td className="p-3">{s.Quantity}</td>

                {/* Avg Price */}
                <td className="p-3">{currencySymbol}{s.Average_Price}</td>

                {/* Current Price */}
                <td className="p-3">{currencySymbol}{s.CurrentPrice}</td>

                {/* Investment */}
                <td className="p-3">{currencySymbol}{s.Investment}</td>

                {/* Current Value */}
                <td className="p-3 font-semibold">
                  {currencySymbol}{s.CurrentValue}
                </td>

                {/* Profit/Loss */}
                <td
                  className={`p-3 font-semibold ${
                    isProfit ? "text-green-600" : "text-red-500"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {isProfit ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {currencySymbol}{s.ProfitLoss}
                  </div>
                </td>

                {/* Return % */}
                <td
                  className={`p-3 font-semibold ${
                    s.ReturnPct >= 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {s.ReturnPct}%
                </td>

                {/* Exchange */}
                <td className="p-3 rounded-r-lg">
                  <div className="flex items-center gap-1 text-gray-700">
                    <Landmark className="w-4 h-4 text-gray-400" />
                    {s.Exchange}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}