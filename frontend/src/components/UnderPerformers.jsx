import { TrendingDown, TrendingUp } from "lucide-react";

export default function UnderPerformers({ items = [] }) {

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <div className="flex gap-2 mb-4">

                <TrendingDown className="text-red-500" />

                <h2 className="font-bold">

                    Under Performers

                </h2>

            </div>

            <table className="w-full">
            <thead>
                <tr className="text-sm text-gray-500 border-b">
                <th className="py-3 text-left font-semibold">Holding</th>
                <th className="py-3 text-left font-semibold">Return %</th>
                </tr>
            </thead>
            <tbody>

                    {

                        items.map((x, index) => (

                            <tr key={index} className="hover:bg-slate-50 transition">

                                <td>{x.holding}</td>
                                <td
                                    className={`py-3 text-left font-semibold ${
                                        x.return >= 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                    >
                                    {x.return >= 0 ? (
                                        <TrendingUp className="inline w-4 h-4 mr-1" />
                                    ) : (
                                        <TrendingDown className="inline w-4 h-4 mr-1" />
                                    )}

                                    {x.return.toFixed(2)}%
                                </td>
                            </tr>
                        ))

                    }

            </tbody>

            </table>

        </div>

    )

}