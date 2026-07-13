import { Lightbulb, Sparkles } from "lucide-react";

export default function NarrativeInsights({ insights = [] }) {
  if (!insights.length) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="bg-yellow-100 p-2 rounded-lg">
          <Lightbulb className="w-6 h-6 text-yellow-600" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Narrative Insights
          </h2>
          <p className="text-sm text-gray-500">
            AI-generated observations about your portfolio.
          </p>
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-4">
        {insights.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 p-4 rounded-lg bg-yellow-50 border border-yellow-200 hover:shadow transition"
          >
            <div className="mt-1">
              <Sparkles className="text-yellow-600 w-5 h-5" />
            </div>

            <div>
              <div className="font-semibold text-slate-700 mb-1">
                Insight #{index + 1}
              </div>

              <p className="text-gray-700 leading-relaxed">
                {item}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}