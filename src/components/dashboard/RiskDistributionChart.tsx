"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { Deal } from "@/types/deal";
import { calculateRiskDistribution } from "@/utils/analytics";

interface RiskDistributionChartProps {
  deals: Deal[];
}

export default function RiskDistributionChart({
  deals,
}: RiskDistributionChartProps) {
  const data = calculateRiskDistribution(deals);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6">
        <h2 className="font-semibold text-white">
          Risk Distribution
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          Current opportunity risk levels
        </p>
      </div>

      <div className="h-[260px] w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 15,
              left: 10,
              bottom: 5,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              horizontal={false}
            />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 11,
              }}
            />

            <YAxis
              type="category"
              dataKey="risk"
              axisLine={false}
              tickLine={false}
              width={65}
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
              }}
            />

            <Tooltip
              cursor={{
                fill: "rgba(51, 65, 85, 0.2)",
              }}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "8px",
              }}
              labelStyle={{
                color: "#fff",
              }}
              itemStyle={{
                color: "#22d3ee",
              }}
            />

            <Bar
              dataKey="count"
              name="Deals"
              fill="#22d3ee"
              radius={[0, 6, 6, 0]}
              barSize={28}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}