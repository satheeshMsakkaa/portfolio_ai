
export default function RebalanceSuggestions({ data }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-bold mb-3">Rebalancing Suggestions</h2>
      <ul className="list-disc pl-6">
        {data?.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
