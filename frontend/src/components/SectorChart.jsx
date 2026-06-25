import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6"
];

export default function SectorChart({ data = [], currencySymbol }) {
  return (
      <ResponsiveContainer width="100%" height="95%">
        <BarChart width={500} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sector" />
          <YAxis />
          <Tooltip formatter={(value) => [`${currencySymbol}${Number(value).toLocaleString()}`, "Value"]} />

          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
  );
}