"use client";

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import DashboardShell from "@/components/layout/DashboardShell";
import { getDeals } from "@/services/dealService";
import type { Deal } from "@/types/deal";
import type { RootState } from "@/store";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function InvestorDashboardPage() {
  /*
   * Redux - Investments
   */
  const investments = useSelector(
    (state: RootState) => state.investments.investments
  );

  /*
   * Local state
   */
  const [deals, setDeals] = useState<Deal[]>([]);
  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  /*
   * Load deals
   */
  useEffect(() => {
    let active = true;

    const loadDeals = async () => {
      try {
        setStatus("loading");

        const response = await getDeals({
          page: 1,
          pageSize: 100,
        });

        if (!active) return;

        setDeals(
          Array.isArray(response?.data)
            ? response.data
            : []
        );

        setStatus("success");
      } catch (error) {
        console.error(
          "Failed to load investor dashboard:",
          error
        );

        if (!active) return;

        setDeals([]);
        setStatus("error");
      }
    };

    loadDeals();

    return () => {
      active = false;
    };
  }, []);

  /*
   * Investment + Deal mapping
   */
  const investmentData = useMemo(() => {
    return investments
      .map((investment) => {
        const deal = deals.find(
          (item) => item.id === investment.dealId
        );

        if (!deal) {
          return null;
        }

        return {
          ...investment,
          deal,
        };
      })
      .filter((item) => item !== null);
  }, [investments, deals]);

  /*
   * Summary Metrics
   */
  const metrics = useMemo(() => {
    const totalInvested = investments.reduce(
      (sum, investment) => {
        return (
          sum + Number(investment.investedAmount || 0)
        );
      },
      0
    );

    const activeInvestments = investments.filter(
      (investment) => investment.status === "Active"
    ).length;

    const averageROI =
      investmentData.length > 0
        ? investmentData.reduce(
            (sum, item) => {
              return (
                sum +
                Number(item.deal.expectedROI || 0)
              );
            },
            0
          ) / investmentData.length
        : 0;

    return {
      totalInvestments: investments.length,
      activeInvestments,
      totalInvested,
      averageROI,
    };
  }, [investments, investmentData]);

  /*
   * Investment Growth
   */
  const investmentGrowthData = useMemo(() => {
    const sorted = [...investments].sort(
      (a, b) =>
        new Date(a.investedAt).getTime() -
        new Date(b.investedAt).getTime()
    );

    let runningTotal = 0;

    return sorted.map((investment) => {
      runningTotal += Number(
        investment.investedAmount || 0
      );

      return {
        date: new Date(
          investment.investedAt
        ).toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
        }),
        invested: runningTotal,
      };
    });
  }, [investments]);

  /*
   * Industry Distribution
   */
  const industryDistribution = useMemo(() => {
    const counts: Record<string, number> = {};

    investmentData.forEach((item) => {
      const industry = item.deal.industry;

      counts[industry] =
        (counts[industry] ?? 0) + 1;
    });

    return Object.entries(counts)
      .map(([industry, count]) => ({
        industry,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [investmentData]);

  /*
   * Risk Distribution
   */
  const riskDistribution = useMemo(() => {
    const counts = {
      Low: 0,
      Medium: 0,
      High: 0,
    };

    investmentData.forEach((item) => {
      const risk = item.deal.riskLevel;

      if (risk === "Low") {
        counts.Low += 1;
      } else if (risk === "Medium") {
        counts.Medium += 1;
      } else if (risk === "High") {
        counts.High += 1;
      }
    });

    return [
      {
        risk: "Low",
        count: counts.Low,
      },
      {
        risk: "Medium",
        count: counts.Medium,
      },
      {
        risk: "High",
        count: counts.High,
      },
    ];
  }, [investmentData]);

  /*
   * Risk vs ROI
   */
  const riskROIData = useMemo(() => {
    return investmentData.map((item) => {
      let riskValue = 3;

      if (item.deal.riskLevel === "Low") {
        riskValue = 1;
      } else if (
        item.deal.riskLevel === "Medium"
      ) {
        riskValue = 2;
      }

      return {
        company: item.deal.companyName,
        risk: riskValue,
        roi: Number(item.deal.expectedROI || 0),
      };
    });
  }, [investmentData]);

  /*
   * Loading State
   */
  if (status === "loading") {
    return (
      <DashboardShell>
        <div className="mx-auto max-w-[1600px] p-6 lg:p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-40 rounded bg-slate-800" />

            <div className="h-10 w-72 rounded bg-slate-800" />

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-32 rounded-xl border border-slate-800 bg-slate-900"
                />
              ))}
            </div>

            <div className="mt-4 h-[350px] rounded-xl border border-slate-800 bg-slate-900" />
          </div>
        </div>
      </DashboardShell>
    );
  }

  /*
   * Error State
   */
  if (status === "error") {
    return (
      <DashboardShell>
        <div className="mx-auto max-w-[1600px] p-6 lg:p-8">
          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-8">
            <h1 className="text-xl font-semibold text-red-400">
              Unable to load investor dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Please refresh the page and try again.
            </p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  /*
   * Dashboard
   */
  return (
    <DashboardShell>
      <div className="mx-auto max-w-[1600px] p-6 lg:p-8">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm text-cyan-400">
            Investor Intelligence
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
            Investor Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Track your investments, portfolio growth,
            expected returns, and risk exposure.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Total Investments */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Total Investments
            </p>

            <p className="mt-3 text-3xl font-semibold text-white">
              {metrics.totalInvestments}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Portfolio investments
            </p>
          </div>

          {/* Active Investments */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Active Investments
            </p>

            <p className="mt-3 text-3xl font-semibold text-cyan-400">
              {metrics.activeInvestments}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Currently active
            </p>
          </div>

          {/* Total Invested */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Total Invested
            </p>

            <p className="mt-3 text-3xl font-semibold text-white">
              ₹
              {metrics.totalInvested.toLocaleString(
                "en-IN"
              )}
            </p>

            <p className="mt-2 text-xs text-emerald-400">
              Portfolio capital
            </p>
          </div>

          {/* ROI */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              ROI Overview
            </p>

            <p className="mt-3 text-3xl font-semibold text-emerald-400">
              {metrics.averageROI.toFixed(1)}%
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Average expected ROI
            </p>
          </div>
        </div>

        {/* Investment Growth */}
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-6">
            <h2 className="font-semibold text-white">
              Investment Growth
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Cumulative investment over time
            </p>
          </div>

          {investmentGrowthData.length === 0 ? (
            <div className="flex h-[300px] items-center justify-center">
              <p className="text-sm text-slate-600">
                No investment history available.
              </p>
            </div>
          ) : (
            <div className="h-[300px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={investmentGrowthData}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                  />

                  <XAxis
                    dataKey="date"
                    stroke="#64748b"
                  />

                  <YAxis stroke="#64748b" />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="invested"
                    name="Invested"
                    stroke="#22d3ee"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Industry + Risk Distribution */}
        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">

          {/* Industry Distribution */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

            <div className="mb-6">
              <h2 className="font-semibold text-white">
                Industry Distribution
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Investments across industries
              </p>
            </div>

            {industryDistribution.length === 0 ? (
              <div className="flex h-[300px] items-center justify-center">
                <p className="text-sm text-slate-600">
                  No industry data available.
                </p>
              </div>
            ) : (
              <div className="h-[300px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={industryDistribution}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#1e293b"
                    />

                    <XAxis
                      dataKey="industry"
                      stroke="#64748b"
                    />

                    <YAxis
                      allowDecimals={false}
                      stroke="#64748b"
                    />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />

                    <Bar
                      dataKey="count"
                      name="Investments"
                      fill="#22d3ee"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Risk Distribution */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

            <div className="mb-6">
              <h2 className="font-semibold text-white">
                Risk Distribution
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Portfolio exposure by risk level
              </p>
            </div>

            {investmentData.length === 0 ? (
              <div className="flex h-[300px] items-center justify-center">
                <p className="text-sm text-slate-600">
                  No risk data available.
                </p>
              </div>
            ) : (
              <div className="h-[300px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={riskDistribution}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#1e293b"
                    />

                    <XAxis
                      dataKey="risk"
                      stroke="#64748b"
                    />

                    <YAxis
                      allowDecimals={false}
                      stroke="#64748b"
                    />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />

                    <Bar
                      dataKey="count"
                      name="Investments"
                      fill="#f59e0b"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* Risk vs ROI */}
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-6">
            <h2 className="font-semibold text-white">
              Risk vs ROI
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Relationship between risk and expected return
            </p>
          </div>

          {riskROIData.length === 0 ? (
            <div className="flex h-[300px] items-center justify-center">
              <p className="text-sm text-slate-600">
                No investment data available.
              </p>
            </div>
          ) : (
            <div className="h-[300px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <ScatterChart>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                  />

                  <XAxis
                    type="number"
                    dataKey="risk"
                    domain={[0, 4]}
                    ticks={[1, 2, 3]}
                    tickFormatter={(value) => {
                      if (value === 1) return "Low";
                      if (value === 2) return "Medium";
                      return "High";
                    }}
                    stroke="#64748b"
                  />

                  <YAxis
                    type="number"
                    dataKey="roi"
                    name="ROI"
                    stroke="#64748b"
                  />

                  <Tooltip
                    cursor={{
                      strokeDasharray: "3 3",
                    }}
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />

                  <Legend />

                  <Scatter
                    name="Expected ROI"
                    data={riskROIData}
                    fill="#34d399"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Empty Portfolio */}
        {investments.length === 0 && (
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-10 text-center">

            <h2 className="text-lg font-semibold text-white">
              Your portfolio is empty
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Explore deals and express interest in
              investment opportunities to build your
              portfolio.
            </p>

            <a
              href="/deals"
              className="mt-5 inline-flex rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Explore Deals
            </a>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}