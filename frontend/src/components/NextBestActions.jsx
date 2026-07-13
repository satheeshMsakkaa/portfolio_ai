import { CheckCircle2, ArrowRightCircle } from "lucide-react";

export default function NextBestActions({ actions = [] }) {
  if (!actions.length) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-blue-100 p-2 rounded-lg">
          <ArrowRightCircle className="w-6 h-6 text-blue-600" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Next Best Actions
          </h2>
          <p className="text-sm text-gray-500">
            AI recommended actions to improve your portfolio performance.
          </p>
        </div>
      </div>

      {/* Action List */}
      <div className="space-y-3">
        {actions.map((action, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
          >
            <div className="mt-0.5">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>

            <div>
              <div className="font-medium text-slate-800">
                Action {index + 1}
              </div>

              <p className="text-gray-600 leading-relaxed">
                {action}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}