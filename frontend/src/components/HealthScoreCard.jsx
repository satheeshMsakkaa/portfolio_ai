import { Activity } from "lucide-react";

export default function HealthScoreCard({ score = 0 }) {
  const getColor = () => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getStatus = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Moderate";
    return "Needs Attention";
  };

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <div className="flex items-center gap-3 mb-3">
        <Activity className="w-6 h-6 text-blue-600" />
        <h3 className="font-semibold text-lg">Portfolio Health</h3>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className={`text-4xl font-bold ${getColor()}`}>
            {score}
          </p>
          <p className="text-gray-500">out of 100</p>
        </div>

        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            score >= 80
              ? "bg-green-100 text-green-700"
              : score >= 60
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {getStatus()}
        </div>
      </div>
    </div>
  );
}