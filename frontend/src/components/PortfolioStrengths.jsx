import { BadgeCheck } from "lucide-react";

export default function PortfolioStrengths({ items=[] }){

    return(
        <div className="bg-white rounded-xl shadow p-5">

            <div className="flex gap-2 items-center mb-4">
                <BadgeCheck className="text-green-600"/>
                <h2 className="font-bold">Portfolio Strengths</h2>
            </div>

            <ul className="space-y-3">

                {items.map((item,index)=>

                    <li
                        key={index}
                        className="bg-green-50 rounded p-3"
                    >
                        {item}
                    </li>

                )}

            </ul>

        </div>
    )

}