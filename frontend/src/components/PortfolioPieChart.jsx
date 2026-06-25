import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Amber
  "#EF4444", // Red
];

export default function PortfolioPieChart({ data = [], currencySymbol }) {
  return (
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip formatter={(value) => [`${currencySymbol}${Number(value).toLocaleString()}`, "Value"]} />
        <Legend />
      </PieChart>
  );
}