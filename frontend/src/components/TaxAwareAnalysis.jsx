import { Landmark } from "lucide-react";

export default function TaxAwareAnalysis({ data = {} }) {

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <div className="flex gap-2 mb-4">

                <Landmark className="text-indigo-600" />

                <h2 className="font-bold">

                    Tax-aware Analysis

                </h2>

            </div>

            <p className="mb-3">

                {data.taxImplications}

            </p>

            <ul className="space-y-2">

                {

                    data.taxImplications?.map((item, index) => (

                        <li key={index}>

                            • {item}

                        </li>

                    ))

                }

            </ul>

        </div>

    )

}