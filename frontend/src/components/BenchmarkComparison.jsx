import { Trophy, TrendingUp, TrendingDown } from "lucide-react";

export default function BenchmarkComparison({ data = {} }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="text-yellow-500" />
        <h2 className="font-bold text-lg">Benchmark Comparison</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4 text-center">
        <div className="bg-slate-50 rounded p-3">
          <p className="text-sm text-gray-500">Benchmark</p>
          <p className="font-semibold">{data.benchmark}</p>
        </div>

        <div className="bg-green-50 rounded p-3">
          <TrendingUp className="mx-auto text-green-600" />
          <p className="text-sm">Portfolio</p>
          <p className="font-bold text-green-700">
            {data.portfolioReturn}%
          </p>
        </div>

        <div className="bg-blue-50 rounded p-3">
          <TrendingDown className="mx-auto text-blue-600" />
          <p className="text-sm">Benchmark</p>
          <p className="font-bold text-blue-700">
            {data.benchmarkReturn}%
          </p>
        </div>
      </div>
    </div>
  );
}