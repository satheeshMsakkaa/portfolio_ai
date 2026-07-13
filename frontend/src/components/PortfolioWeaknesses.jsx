import { TriangleAlert } from "lucide-react";

export default function PortfolioWeaknesses({ items = [] }) {

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <div className="flex gap-2 mb-4 items-center">

                <TriangleAlert className="text-orange-600" />

                <h2 className="font-bold">

                    Portfolio Weaknesses

                </h2>

            </div>

            <ul className="space-y-3">

                {

                    items.map((item, index) => (

                        <li

                            key={index}

                            className="bg-orange-50 rounded p-3"

                        >

                            {item}

                        </li>

                    ))

                }

            </ul>

        </div>

    )

}