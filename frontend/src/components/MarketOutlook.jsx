import { Globe } from "lucide-react";

export default function MarketOutlook({ data = {} }) {

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <div className="flex gap-2 mb-4">

                <Globe className="text-blue-600" />

                <h2 className="font-bold">

                    Market Outlook

                </h2>

            </div>

            <div className="font-semibold mb-4">

                Overall Outlook : {data.outlook}

            </div>

            <ul className="space-y-2">

                {

                    data.trends?.map((item, index) =>

                        <li key={index}>

                            • {item}

                        </li>

                    )

                }

            </ul>

        </div>

    )

}