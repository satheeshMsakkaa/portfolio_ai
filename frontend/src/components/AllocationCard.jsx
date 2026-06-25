import { TrendingUp, TrendingDown } from "lucide-react";

export default function AllocationCard({ title, data, color, type }) {
  return (
    <div className="bg-white rounded shadow p-5 space-y-4">
      <div className="flex items-center gap-2 mb-3">
        {type === "current" ? (
          <TrendingDown className="text-red-500 w-5 h-5" />
        ) : (
          <TrendingUp className="text-green-500 w-5 h-5" />
        )}

        <h4 className="font-semibold">{title}</h4>
      </div>

      <div className="space-y-3">
        {Object.entries(data || {}).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">{key}</span>
              <span className="font-medium">{value}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded h-2">
              <div
                className={`h-2 rounded ${color}`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}