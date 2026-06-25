import { TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

export default function MutualFundTable({ funds = [], currencySymbol }) {
  return (
    <div className="bg-white rounded shadow p-4 overflow-x-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <PiggyBank className="text-blue-500 w-5 h-5" />
        <h2 className="font-bold">Funds</h2>
      </div>

      <table className="w-full text-sm border-collapse">
        {/* Table Head */}
        <thead>
          <tr className="bg-gray-100 text-left text-gray-700">
            <th className="p-3">Fund</th>
            <th className="p-3">Units</th>
            <th className="p-3">Avg NAV</th>
            <th className="p-3">Current NAV</th>
            <th className="p-3">Investment</th>
            <th className="p-3">Current Value</th>
            <th className="p-3">P/L</th>
            <th className="p-3">Return %</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {funds.map((f, i) => {
            const isProfit = f.ProfitLoss >= 0;

            return (
              <tr key={i} className="border-b hover:bg-gray-50">
                {/* Fund Name */}
                <td className="p-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{f.fund_name}</span>
                    <span className="text-xs text-gray-500">{f.isin}</span>
                  </div>
                </td>

                <td className="p-3">{f.units}</td>

                <td className="p-3">{f.average_nav}</td>

                <td className="p-3">{currencySymbol}{f.CurrentNAV}</td>

                <td className="p-3">{currencySymbol}{f.Investment}</td>

                <td className="p-3 font-semibold">
                  {currencySymbol}{f.CurrentValue}
                </td>

                {/* Profit/Loss */}
                <td
                  className={`p-3 font-semibold flex items-center gap-2 ${
                    isProfit ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {isProfit ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {currencySymbol}{f.ProfitLoss}
                </td>

                {/* Return % */}
                <td
                  className={`p-3 font-semibold ${
                    f.ReturnPct >= 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {f.ReturnPct}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}