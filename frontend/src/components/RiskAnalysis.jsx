import { ShieldAlert } from "lucide-react";

export default function RiskAnalysis({ data = {} }) {
    return (
        <div className="bg-white rounded-xl shadow p-5">

            <div className="flex items-center gap-2 mb-4">
                <ShieldAlert className="text-red-500" />
                <h2 className="font-bold">Risk Analysis</h2>
            </div>

            <div className="mb-3">
                <div className="text-4xl font-bold">
                    {data.riskScore}/100
                </div>

                <div className="text-red-600 font-medium">
                    {data.riskLevel}
                </div>
            </div>

            <ul className="space-y-2">
                {data.riskFactors?.map((item, i) => (
                    <li key={i}>• {item}</li>
                ))}
            </ul>

        </div>
    );
}