"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface IndustryDistributionChartProps {
  data: {
    industry: string;
    count: number;
  }[];
}

export default function IndustryDistributionChart({
  data,
}: IndustryDistributionChartProps) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 40,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
          />

          <XAxis
            dataKey="industry"
            stroke="#64748b"
            tickLine={false}
            axisLine={false}
            angle={-30}
            textAnchor="end"
            interval={0}
          />

          <YAxis
            stroke="#64748b"
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "8px",
              color: "#fff",
            }}
            formatter={(value) => [
              Number(value),
              "Deals",
            ]}
          />

          <Bar
            dataKey="count"
            fill="#22d3ee"
            radius={[6, 6, 0, 0]}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}