import ReactMarkdown from "react-markdown";

export default function AIInsights({ insights }) {
  let content = "";
  if (insights?.error?.error) {
    content = insights.error.error.message || "An error occurred while fetching insights.";
  } else if (insights?.result) {
    content = insights.result;
  } else {
    content = insights || "No insights available.";
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-bold mb-3">🤖 AI Insights</h2>
      <div className="whitespace-pre-wrap">
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
