import ReactMarkdown from "react-markdown";

export default function AIInsights({ insights }) {
  let content = "";
  if (insights?.success) {
    content = insights?.response || "An error occurred while fetching insights.";
  } else if (!insights?.success) {
    content = insights?.error || "An error occurred while fetching insights.";
  } else {
    content = "No insights available.";
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3 mb-4">
        
        {/* Left */}
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            🤖 AI Insights
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Portfolio analysis powered by AI
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
            {insights?.provider || "N/A"}
          </span>

          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold max-w-[220px] truncate">
            {insights?.model || "Unknown Model"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="whitespace-pre-wrap text-gray-700">
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
