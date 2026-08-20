"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { Deal } from "@/types/deal";
import { calculateInvestmentGrowth } from "@/utils/analytics";

interface InvestmentGrowthChartProps {
  deals: Deal[];
}

export default function InvestmentGrowthChart({
  deals,
}: InvestmentGrowthChartProps) {
  const data = calculateInvestmentGrowth(deals);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-start justify-between mb-6">

        <div>
          <h2 className="font-semibold text-white">
            Investment Growth
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Portfolio value over the last 12 months
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-medium text-emerald-400">
            +18.6%
          </p>

          <p className="text-[11px] text-slate-500">
            Annual growth
          </p>
        </div>

      </div>

      <div className="h-[280px] w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >

            <defs>
              <linearGradient
                id="investmentGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#22d3ee"
                  stopOpacity={0.3}
                />

                <stop
                  offset="100%"
                  stopColor="#22d3ee"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 11,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 11,
              }}
              tickFormatter={(value) =>
                `₹${value}Cr`
              }
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "8px",
                color: "#fff",
              }}
              labelStyle={{
                color: "#94a3b8",
              }}
              formatter={(value) => [
                `₹${value} Cr`,
                "Portfolio Value",
              ]}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#22d3ee"
              strokeWidth={2}
              fill="url(#investmentGradient)"
              activeDot={{
                r: 5,
              }}
            />

          </AreaChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}