"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import InvestmentGrowthChart from "@/components/dashboard/InvestmentGrowthChart";
import IndustryDistributionChart from "@/components/dashboard/IndustryDistributionChart";
import RiskDistributionChart from "@/components/dashboard/RiskDistributionChart";
import RiskVsROIChart from "@/components/dashboard/RiskVsROIChart";
import { useDeals } from "@/hooks/useDeals";

export default function Home() {
  const {
    deals,
    total,
    status,
  } = useDeals();

  return (
    <DashboardShell>

      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">

        {/* Page Header */}
        <div className="mb-8">

          <p className="text-sm text-cyan-400 mb-2">
            Thursday, August 20, 2026
          </p>

          <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight">
            Good afternoon, Priya.
          </h1>

          <p className="text-slate-400 mt-2">
            Here's what's happening across your investment portfolio.
          </p>

        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          {/* Total Investments */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-sm text-slate-400">
              Total Investments
            </p>

            <p className="text-2xl font-semibold mt-3">
              ₹24.8 Cr
            </p>

            <p className="text-xs text-emerald-400 mt-2">
              +12.4% this year
            </p>

          </div>

          {/* Active Deals */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-sm text-slate-400">
              Active Deals
            </p>

            <p className="text-2xl font-semibold mt-3">
              {status === "loading" ? "..." : total}
            </p>

            <p className="text-xs text-slate-500 mt-2">
              Opportunities available
            </p>

          </div>

          {/* Portfolio ROI */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-sm text-slate-400">
              Portfolio ROI
            </p>

            <p className="text-2xl font-semibold mt-3">
              28.4%
            </p>

            <p className="text-xs text-emerald-400 mt-2">
              +4.8% vs last quarter
            </p>

          </div>

          {/* Portfolio Risk */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-sm text-slate-400">
              Portfolio Risk
            </p>

            <p className="text-2xl font-semibold mt-3">
              Moderate
            </p>

            <p className="text-xs text-amber-400 mt-2">
              Balanced exposure
            </p>

          </div>

        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">

          {/* Investment Growth Chart */}
          <div className="xl:col-span-2">

            <InvestmentGrowthChart
              deals={deals}
            />

          </div>

          {/* Industry Distribution */}
          
          <div>
            <IndustryDistributionChart deals={deals} />
          </div>
        </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">

          <RiskDistributionChart deals={deals} />

          <RiskVsROIChart deals={deals} />

</div>


        {/* Recommended Opportunities */}
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900">

          {/* Section Header */}
          <div className="p-6 border-b border-slate-800">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="font-semibold">
                  Recommended Opportunities
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Deals selected based on your investment profile
                </p>

              </div>

              <button
                className="text-sm text-cyan-400 hover:text-cyan-300 transition"
              >
                View all →
              </button>

            </div>

          </div>

          {/* Deal List */}
          <div className="divide-y divide-slate-800">

            {deals.slice(0, 5).map((deal) => (

              <div
                key={deal.id}
                className="p-5 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition"
              >

                {/* Company Information */}
                <div className="min-w-0">

                  <h3 className="font-medium truncate">
                    {deal.companyName}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {deal.industry} · {deal.fundingStage}
                  </p>

                </div>

                {/* ROI */}
                <div className="text-right shrink-0">

                  <p className="font-semibold text-emerald-400">
                    {deal.expectedROI}%
                  </p>

                  <p className="text-xs text-slate-500">
                    Expected ROI
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </DashboardShell>
  );
}