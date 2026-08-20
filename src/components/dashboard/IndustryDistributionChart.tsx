"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { Deal } from "@/types/deal";
import { calculateIndustryDistribution } from "@/utils/analytics";

interface IndustryDistributionChartProps {
  deals: Deal[];
}

const chartColors = [
  "#22d3ee",
  "#818cf8",
  "#34d399",
  "#f59e0b",
  "#f472b6",
  "#a78bfa",
  "#60a5fa",
];

export default function IndustryDistributionChart({
  deals,
}: IndustryDistributionChartProps) {
  const data = calculateIndustryDistribution(deals);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-4">

        <h2 className="font-semibold text-white">
          Industry Distribution
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          Deal opportunities by industry
        </p>

      </div>

      <div className="h-[230px] w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="count"
              nameKey="industry"
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={88}
              paddingAngle={3}
              stroke="none"
            >

              {data.map((entry, index) => (
                <Cell
                  key={`${entry.industry}-${index}`}
                  fill={
                    chartColors[
                      index % chartColors.length
                    ]
                  }
                />
              ))}

            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "8px",
              }}
              labelStyle={{
                color: "#fff",
              }}
              itemStyle={{
                color: "#cbd5e1",
              }}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="mt-3 space-y-2">

        {data.slice(0, 4).map((item, index) => (

          <div
            key={item.industry}
            className="flex items-center justify-between text-xs"
          >

            <div className="flex items-center gap-2 min-w-0">

              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{
                  backgroundColor:
                    chartColors[
                      index % chartColors.length
                    ],
                }}
              />

              <span className="text-slate-400 truncate">
                {item.industry}
              </span>

            </div>

            <span className="text-slate-300">
              {item.count}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}