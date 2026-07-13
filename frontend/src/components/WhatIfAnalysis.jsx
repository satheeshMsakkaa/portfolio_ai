import { BrainCircuit } from "lucide-react";

export default function WhatIfAnalysis({ items = [] }) {

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <div className="flex gap-2 mb-4">

                <BrainCircuit className="text-purple-600" />

                <h2 className="font-bold">

                    What-if Analysis

                </h2>

            </div>

            <div className="space-y-4">

                {

                    items.map((item, index) =>

                        <div

                            key={index}

                            className="border rounded-lg p-4"

                        >

                            <div className="font-semibold">

                                {item.scenario}

                            </div>

                            <div className="text-sm mt-2">

                                Impact : {item.impact}

                            </div>

                            <ul className="mt-3">

                                {

                                    item.actions?.map((a, i) =>

                                        <li key={i}>• {a}</li>

                                    )

                                }

                            </ul>

                        </div>

                    )

                }

            </div>

        </div>

    )

}