"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface InvestorCompositionChartProps {
  data: {
    type: string;
    count: number;
  }[];
}

const COLORS = [
  "#22d3ee",
  "#34d399",
  "#a78bfa",
  "#f59e0b",
  "#f87171",
];

export default function InvestorCompositionChart({
  data,
}: InvestorCompositionChartProps) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="type"
            cx="50%"
            cy="45%"
            outerRadius={100}
            innerRadius={55}
            paddingAngle={3}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.type}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "8px",
              color: "#fff",
            }}
            formatter={(value) => [
              Number(value),
              "Investors",
            ]}
          />

          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{
              color: "#94a3b8",
              fontSize: "12px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}