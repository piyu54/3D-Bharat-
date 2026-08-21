"use client";

import Link from "next/link";
import InvestorFilters from "@/components/investors/InvestorFilters";
import DashboardShell from "@/components/layout/DashboardShell";
import { useInvestors } from "@/hooks/useInvestors";

export default function InvestorsPage() {
const {
  investors,
  total,
  allInvestors,
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
            Investor Intelligence
          </p>

          <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight">
            Investor Explorer
          </h1>

          <p className="text-slate-400 mt-2">
            Explore investors, their investment capacity,
            preferred industries, and risk preferences.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="space-y-3 mb-6">

          <InvestorFilters
  filters={filters}
  updateFilter={updateFilter}
  clearFilters={clearFilters}
/>

         
          <InvestorFilters
            filters={filters}
            updateFilter={updateFilter}
            clearFilters={clearFilters}
          />

        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Total Investors
            </p>

            <p className="text-2xl font-semibold mt-3">
              {status === "loading" ? "..." : total}
            </p>

            <p className="text-xs text-slate-500 mt-2">
              Investors in platform dataset
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              VC Funds
            </p>

            <p className="text-2xl font-semibold mt-3">
              {allInvestors.filter(
  (investor) => investor.type === "VC Fund"
).length}
            </p>

            <p className="text-xs text-cyan-400 mt-2">
              Institutional investors
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Angel Investors
            </p>

            <p className="text-2xl font-semibold mt-3">
             {allInvestors.filter(
  (investor) =>
    investor.type === "Angel Investor"
).length}
            </p>

            <p className="text-xs text-emerald-400 mt-2">
              Individual investment profiles
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              High Risk Preference
            </p>

            <p className="text-2xl font-semibold mt-3">
{allInvestors.filter(
  (investor) =>
    investor.riskPreference === "High"
).length}
            </p>

            <p className="text-xs text-amber-400 mt-2">
              Higher-risk investment profiles
            </p>
          </div>

        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-4">

          <p className="text-sm text-slate-400">
            {status === "loading"
              ? "Loading investors..."
              : `${total} investors found`}
          </p>

          <p className="text-xs text-slate-500">
            Investment intelligence
          </p>

        </div>

        {/* Loading */}
        {status === "loading" && (
          <div className="space-y-3">

            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-40 rounded-xl border border-slate-800 bg-slate-900 animate-pulse"
              />
            ))}

          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6">

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

        {/* Investors */}
        {status === "success" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {investors.map((investor) => (
              <Link
                key={investor.id}
                href={`/investors/${investor.id}`}
                className="block rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500/40 hover:bg-slate-800/60"
              >

                {/* Top */}
                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0">
                    <h2 className="text-lg font-medium text-white">
                      {investor.name}
                    </h2>

                    <p className="text-sm text-slate-400 mt-1">
                      {investor.company}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">
                    {investor.type}
                  </span>

                </div>

                {/* Location */}
                <p className="text-sm text-slate-500 mt-4">
                  {investor.location}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">

                  <div>
                    <p className="text-xs text-slate-500">
                      Capacity
                    </p>

                    <p className="text-sm font-medium text-white mt-1">
                      ₹{investor.investmentCapacity}L
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Min Ticket
                    </p>

                    <p className="text-sm font-medium text-white mt-1">
                      ₹{investor.minimumTicket}L
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Max Ticket
                    </p>

                    <p className="text-sm font-medium text-white mt-1">
                      ₹{investor.maximumTicket}L
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Risk
                    </p>

                    <p
                      className={`text-sm font-medium mt-1 ${
                        investor.riskPreference === "High"
                          ? "text-amber-400"
                          : investor.riskPreference === "Medium"
                          ? "text-cyan-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {investor.riskPreference}
                    </p>
                  </div>

                </div>

                {/* Preferred Industries */}
                <div className="mt-5">

                  <p className="text-xs text-slate-500 mb-2">
                    Preferred Industries
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {investor.preferredIndustries.map((industry) => (
                        <span
                          key={industry}
                          className="rounded-md border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs text-slate-400"
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

        {/* Empty State */}
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