"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FundingTrendChartProps {
  data: {
    month: string;
    funding: number;
  }[];
}

export default function FundingTrendChart({
  data,
}: FundingTrendChartProps) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
          />

          <XAxis
            dataKey="month"
            stroke="#64748b"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#64748b"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₹${value}L`}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "8px",
              color: "#fff",
            }}
            formatter={(value) => [
              `₹${Number(value).toLocaleString("en-IN")}L`,
              "Funding",
            ]}
          />

          <Line
            type="monotone"
            dataKey="funding"
            stroke="#22d3ee"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}