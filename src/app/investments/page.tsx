"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

import DashboardShell from "@/components/layout/DashboardShell";
import type { RootState } from "@/store";

export default function InvestmentsPage() {
  const investments = useSelector(
    (state: RootState) => state.investments.investments
  );

  const totalInvested = investments.reduce(
    (sum, investment) =>
      sum + Number(investment.investedAmount || 0),
    0
  );

  const activeInvestments = investments.filter(
    (investment) => investment.status === "Active"
  );

  const completedInvestments = investments.filter(
    (investment) => investment.status === "Completed"
  );

  return (
    <DashboardShell>
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-cyan-400 mb-2">
            Portfolio Intelligence
          </p>

          <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white">
            My Investments
          </h1>

          <p className="text-slate-400 mt-2">
            Track your investments, invested capital, and portfolio status.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Total Investments
            </p>

            <p className="text-2xl font-semibold text-white mt-3">
              {investments.length}
            </p>

            <p className="text-xs text-slate-500 mt-2">
              Investment positions
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Total Invested
            </p>

            <p className="text-2xl font-semibold text-white mt-3">
              ₹{totalInvested.toLocaleString("en-IN")}L
            </p>

            <p className="text-xs text-emerald-400 mt-2">
              Capital deployed
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Active
            </p>

            <p className="text-2xl font-semibold text-cyan-400 mt-3">
              {activeInvestments.length}
            </p>

            <p className="text-xs text-slate-500 mt-2">
              Active investments
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Completed
            </p>

            <p className="text-2xl font-semibold text-emerald-400 mt-3">
              {completedInvestments.length}
            </p>

            <p className="text-xs text-slate-500 mt-2">
              Completed investments
            </p>
          </div>

        </div>

        {/* Investments */}
        <div className="rounded-xl border border-slate-800 bg-slate-900">

          <div className="p-6 border-b border-slate-800">
            <h2 className="font-semibold text-white">
              Investment Portfolio
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Your current investment positions
            </p>
          </div>

          {investments.length === 0 ? (
            <div className="p-12 text-center">

              <div className="text-4xl mb-4">
                📊
              </div>

              <h3 className="font-medium text-white">
                No investments yet
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Explore available deals and express interest in opportunities.
              </p>

              <Link
                href="/deals"
                className="inline-flex mt-5 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition"
              >
                Explore Deals
              </Link>

            </div>
          ) : (
            <div className="divide-y divide-slate-800">

              {investments.map((investment) => (
                <div
                  key={investment.dealId}
                  className="p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                >

                  <div>
                    <p className="text-xs text-slate-500">
                      Deal ID
                    </p>

                    <p className="text-sm font-medium text-white mt-1">
                      {investment.dealId}
                    </p>

                    <p className="text-xs text-slate-500 mt-2">
                      Invested on{" "}
                      {new Date(
                        investment.investedAt
                      ).toLocaleDateString("en-IN")}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Invested Amount
                    </p>

                    <p className="text-lg font-semibold text-white mt-1">
                      ₹
                      {Number(
                        investment.investedAmount
                      ).toLocaleString("en-IN")}
                      L
                    </p>
                  </div>

                  <div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        investment.status === "Active"
                          ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}
                    >
                      {investment.status}
                    </span>
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </DashboardShell>
  );
}