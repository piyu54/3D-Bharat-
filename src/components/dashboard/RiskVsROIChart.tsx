"use client";

import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { Deal } from "@/types/deal";
import { calculateRiskVsROI } from "@/utils/analytics";

interface RiskVsROIChartProps {
  deals: Deal[];
}

export default function RiskVsROIChart({
  deals,
}: RiskVsROIChartProps) {
  const data = calculateRiskVsROI(deals);

  const riskMap: Record<string, number> = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  const chartData = data.map((item) => ({
    ...item,
    riskValue: riskMap[item.risk] ?? 2,
  }));

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-5">
        <h2 className="font-semibold text-white">
          Risk vs ROI
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          Expected return compared with opportunity risk
        </p>
      </div>

      <div className="h-[260px] w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <ScatterChart
            margin={{
              top: 10,
              right: 15,
              bottom: 10,
              left: 0,
            }}
          >

            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="3 3"
            />

            <XAxis
              type="number"
              dataKey="riskValue"
              domain={[0.5, 3.5]}
              ticks={[1, 2, 3]}
              tickFormatter={(value) => {
                if (value === 1) return "Low";
                if (value === 2) return "Medium";
                if (value === 3) return "High";
                return "";
              }}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 11,
              }}
            />

            <YAxis
              type="number"
              dataKey="roi"
              unit="%"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 11,
              }}
            />

            <Tooltip
              cursor={{
                strokeDasharray: "3 3",
              }}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "8px",
              }}
              formatter={(value, name) => {
                if (name === "roi") {
                  return [`${value}%`, "Expected ROI"];
                }

                return [value, name];
              }}
              labelFormatter={() => ""}
            />

            <Scatter
              name="Deals"
              data={chartData}
              fill="#22d3ee"
            />

          </ScatterChart>
        </ResponsiveContainer>

      </div>

      <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
        <span>Lower risk</span>
        <span>Higher risk</span>
      </div>

    </div>
  );
}