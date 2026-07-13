import { Siren } from "lucide-react";

export default function AnomalyDetection({ items = [] }) {

    const renderValue = (value) => {
        // String / Number / Boolean
        if (
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
        ) {
            return <span>{String(value)}</span>;
        }

        // Array
        if (Array.isArray(value)) {
            return (
            <ul className="list-disc pl-5 space-y-2">
                {value.map((item, index) => (
                <li key={index}>{renderValue(item)}</li>
                ))}
            </ul>
            );
        }

        // Object
        if (typeof value === "object" && value !== null) {
            return (
            <div className="space-y-2">
                {Object.entries(value).map(([key, val]) => (
                <div key={key}>
                    <span className="font-semibold capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:
                    </span>{" "}
                    {renderValue(val)}
                </div>
                ))}
            </div>
            );
        }

        return null;
    };
    return (

        <div className="bg-white rounded-xl shadow p-5">

            <div className="flex gap-2 mb-4">

                <Siren className="text-red-600" />

                <h2 className="font-bold">

                    Anomaly Detection

                </h2>

            </div>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div
                    key={index}
                    className="bg-white rounded-lg shadow p-4 border"
                    >
                    {renderValue(item)}
                    </div>
                ))}
                </div>
            </div>
    )

}