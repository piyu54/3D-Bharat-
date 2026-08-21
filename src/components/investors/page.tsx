"use client";

import Link from "next/link";

import DashboardShell from "@/components/layout/DashboardShell";
import InvestorFilters from "@/components/investors/InvestorFilters";
import { useInvestors } from "@/hooks/useInvestors";

export default function InvestorsPage() {
  const {
    investors,
    total,
    status,
    error,
    retry,
    filters,
    updateFilter,
    clearFilters,
  } = useInvestors();

  return (
    <DashboardShell>
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-cyan-400 mb-2">
            Investor Network
          </p>

          <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white">
            Investor Explorer
          </h1>

          <p className="text-slate-400 mt-2">
            Explore investors by investment capacity,
            risk preference, and preferred industries.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <InvestorFilters
            filters={filters}
            updateFilter={updateFilter}
            clearFilters={clearFilters}
          />
        </div>

        {/* Result Summary */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-slate-400">
              {status === "loading"
                ? "Loading investors..."
                : `${total} investors found`}
            </p>
          </div>
        </div>

        {/* Error */}
        {status === "error" && (
          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6 mb-4">
            <p className="text-sm text-red-400">
              {error}
            </p>

            <button
              type="button"
              onClick={retry}
              className="mt-3 text-sm text-cyan-400 hover:text-cyan-300"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading */}
        {status === "loading" && (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-32 rounded-xl border border-slate-800 bg-slate-900 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Investors */}
        {status === "success" && investors.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {investors.map((investor) => (
              <Link
                key={investor.id}
                href={`/investors/${investor.id}`}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-cyan-500/40 hover:bg-slate-800/60"
              >
                <div className="flex items-start justify-between gap-4">

                  {/* Investor */}
                  <div className="min-w-0">
                    <h2 className="text-lg font-medium text-white">
                      {investor.name}
                    </h2>

                    <p className="text-sm text-cyan-400 mt-1">
                      {investor.company}
                    </p>

                    <p className="text-sm text-slate-500 mt-2">
                      {investor.type} · {investor.location}
                    </p>
                  </div>

                  {/* Risk */}
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                      investor.riskPreference === "Low"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : investor.riskPreference === "Medium"
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {investor.riskPreference} Risk
                  </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mt-6">

                  <div>
                    <p className="text-xs text-slate-500">
                      Investment Capacity
                    </p>

                    <p className="text-lg font-semibold text-white mt-1">
                      ₹{investor.investmentCapacity}L
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Ticket Range
                    </p>

                    <p className="text-sm font-medium text-white mt-1">
                      ₹{investor.minimumTicket}L – ₹
                      {investor.maximumTicket}L
                    </p>
                  </div>

                </div>

                {/* Industries */}
                <div className="mt-5">
                  <p className="text-xs text-slate-500 mb-2">
                    Preferred Industries
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {investor.preferredIndustries.map(
                      (industry) => (
                        <span
                          key={industry}
                          className="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-slate-400"
                        >
                          {industry}
                        </span>
                      )
                    )}
                  </div>
                </div>

              </Link>
            ))}
          </div>
        )}

        {/* Empty */}
        {status === "success" && investors.length === 0 && (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-12 text-center">
            <h2 className="font-medium text-white">
              No investors found
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Try changing your search or filters.
            </p>
          </div>
        )}

      </div>
    </DashboardShell>
  );
}