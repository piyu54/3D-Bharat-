"use client";

import InvestorCompositionChart from "@/components/corporate/InvestorCompositionChart";
import IndustryDistributionChart from "@/components/corporate/IndustryDistributionChart";
import { useEffect, useMemo, useState } from "react";
import FundingTrendChart from "@/components/corporate/FundingTrendChart";
import DashboardShell from "@/components/layout/DashboardShell";
import { getDeals } from "@/services/dealService";
import { getInvestors } from "@/services/investorService";

import type { Deal } from "@/types/deal";
import type { Investor } from "@/types/investor";

export default function CorporateDashboardPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [investors, setInvestors] = useState<Investor[]>([]);

  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      setStatus("loading");

      try {
        const [dealResponse, investorResponse] =
          await Promise.all([
            getDeals({
              page: 1,
              pageSize: 100,
            }),
            getInvestors(),
          ]);

        if (!active) {
          return;
        }

        /*
         * Deals
         *
         * getDeals() returns a response object,
         * so we use .data.
         */
        setDeals(
          Array.isArray(dealResponse?.data)
            ? dealResponse.data
            : []
        );

        /*
         * Investors
         *
         * getInvestors() returns InvestorsResponse,
         * so we use .data.
         */
       setInvestors(
  Array.isArray(investorResponse)
    ? investorResponse
    : []
);

        setStatus("success");
      } catch (error) {
        console.error(
          "Failed to load corporate dashboard:",
          error
        );

        if (!active) {
          return;
        }

        setDeals([]);
        setInvestors([]);
        setStatus("error");
      }
    };

    loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  /*
   * Corporate Analytics
   */
  const analytics = useMemo(() => {
    const safeDeals = Array.isArray(deals)
      ? deals
      : [];

    const safeInvestors = Array.isArray(investors)
      ? investors
      : [];

    const totalFundingRaised =
      safeDeals.reduce(
        (sum, deal) =>
          sum + Number(deal.minimumInvestment || 0),
        0
      );

    const activeDeals = safeDeals.filter(
      (deal) =>
        deal.status === "Active" 
    ).length;

    const totalDeals = safeDeals.length;

    const conversionRate =
      totalDeals > 0
        ? (activeDeals / totalDeals) * 100
        : 0;

    const averageROI =
      totalDeals > 0
        ? safeDeals.reduce(
            (sum, deal) =>
              sum + Number(deal.expectedROI || 0),
            0
          ) / totalDeals
        : 0;

    const totalInvestmentCapacity =
      safeInvestors.reduce(
        (sum, investor) =>
          sum +
          Number(
            investor.investmentCapacity || 0
          ),
        0
      );

    return {
      totalFundingRaised,
      activeDeals,
      totalDeals,
      conversionRate,
      averageROI,
      totalInvestmentCapacity,
    };
  }, [deals, investors]);

  /*
   * Industry Distribution
   */
  const industryData = useMemo(() => {
    const counts: Record<string, number> = {};

    const safeDeals = Array.isArray(deals)
      ? deals
      : [];

    safeDeals.forEach((deal) => {
      counts[deal.industry] =
        (counts[deal.industry] ?? 0) + 1;
    });

    return Object.entries(counts)
      .map(([industry, count]) => ({
        industry,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [deals]);

  /*
   * Investor Type Distribution
   */
  const investorTypeData = useMemo(() => {
    const counts: Record<string, number> = {};

    const safeInvestors = Array.isArray(investors)
      ? investors
      : [];

    safeInvestors.forEach((investor) => {
      counts[investor.type] =
        (counts[investor.type] ?? 0) + 1;
    });

    return Object.entries(counts)
      .map(([type, count]) => ({
        type,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [investors]);

  /*
   * Top Opportunities
   */
  const topOpportunities = useMemo(() => {
    const safeDeals = Array.isArray(deals)
      ? deals
      : [];

    return [...safeDeals]
      .sort(
        (a, b) =>
          Number(b.expectedROI || 0) -
          Number(a.expectedROI || 0)
      )
      .slice(0, 5);
  }, [deals]);

  /*
 * Funding Trend
 */
const fundingTrendData = useMemo(() => {
  const safeDeals = Array.isArray(deals) ? deals : [];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
  ];

  const totalFunding = safeDeals.reduce(
    (sum, deal) =>
      sum + Number(deal.fundingRequired || 0),
    0
  );

  return months.map((month, index) => ({
    month,
    funding: Math.round(
      (totalFunding / 6) * (index + 1)
    ),
  }));
}, [deals]);
  /*
   * Loading
   */
  if (status === "loading") {
    return (
      <DashboardShell>
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
          <div className="animate-pulse space-y-4">

            <div className="h-4 w-40 rounded bg-slate-800" />

            <div className="h-10 w-72 rounded bg-slate-800" />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-32 rounded-xl bg-slate-900 border border-slate-800"
                />
              ))}
            </div>

          </div>
        </div>
      </DashboardShell>
    );
  }

  /*
   * Error
   */
  if (status === "error") {
    return (
      <DashboardShell>
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">

          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-8">

            <h1 className="text-xl font-semibold text-red-400">
              Unable to load corporate analytics
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Please refresh the page and try again.
            </p>

          </div>

        </div>
      </DashboardShell>
    );
  }

  const safeDeals = Array.isArray(deals)
    ? deals
    : [];

  const safeInvestors = Array.isArray(investors)
    ? investors
    : [];

  return (
    <DashboardShell>
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm text-cyan-400 mb-2">
            Corporate Intelligence
          </p>

          <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white">
            Corporate Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Monitor funding activity, investor participation,
            and opportunity performance.
          </p>

        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          {/* Funding */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-sm text-slate-400">
              Total Funding Raised
            </p>

            <p className="text-2xl font-semibold text-white mt-3">
              ₹
              {analytics.totalFundingRaised.toLocaleString(
                "en-IN"
              )}
              L
            </p>

            <p className="text-xs text-emerald-400 mt-2">
              Across listed opportunities
            </p>

          </div>

          {/* Investors */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-sm text-slate-400">
              Investor Count
            </p>

            <p className="text-2xl font-semibold text-white mt-3">
              {safeInvestors.length}
            </p>

            <p className="text-xs text-slate-500 mt-2">
              Registered investor profiles
            </p>

          </div>

          {/* Conversion */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-sm text-slate-400">
              Conversion Rate
            </p>

            <p className="text-2xl font-semibold text-white mt-3">
              {analytics.conversionRate.toFixed(1)}%
            </p>

            <p className="text-xs text-cyan-400 mt-2">
              Active opportunities
            </p>

          </div>

          {/* ROI */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-sm text-slate-400">
              Average Expected ROI
            </p>

            <p className="text-2xl font-semibold text-emerald-400 mt-3">
              {analytics.averageROI.toFixed(1)}%
            </p>

            <p className="text-xs text-slate-500 mt-2">
              Across available deals
            </p>

          </div>

        </div>
            {/* Funding Trend */}
<div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
  <div className="mb-6">
    <h2 className="font-semibold text-white">
      Funding Trend
    </h2>

    <p className="text-xs text-slate-500 mt-1">
      Simulated funding activity over time
    </p>
  </div>

  <FundingTrendChart data={fundingTrendData} />
</div>
        {/* Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">

          {/* Deal Activity */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="font-semibold text-white">
                  Deal Activity
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Current opportunity pipeline
                </p>
              </div>

              <span className="text-xs text-cyan-400">
                {analytics.totalDeals} total
              </span>

            </div>

            <div className="mt-8 space-y-5">

              {/* Active Deals */}
              <div>

                <div className="flex justify-between text-sm mb-2">

                  <span className="text-slate-400">
                    Active Deals
                  </span>

                  <span className="text-white">
                    {analytics.activeDeals}
                  </span>

                </div>

                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-cyan-400"
                    style={{
                      width: `${
                        analytics.totalDeals > 0
                          ? (analytics.activeDeals /
                              analytics.totalDeals) *
                            100
                          : 0
                      }%`,
                    }}
                  />

                </div>

              </div>

              {/* Other Opportunities */}
              <div>

                <div className="flex justify-between text-sm mb-2">

                  <span className="text-slate-400">
                    Other Opportunities
                  </span>

                  <span className="text-white">
                    {Math.max(
                      analytics.totalDeals -
                        analytics.activeDeals,
                      0
                    )}
                  </span>

                </div>

                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-slate-600"
                    style={{
                      width: `${
                        analytics.totalDeals > 0
                          ? ((analytics.totalDeals -
                              analytics.activeDeals) /
                              analytics.totalDeals) *
                            100
                          : 0
                      }%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Investor Capacity */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="font-semibold text-white">
              Investor Capacity
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Combined investment capacity
            </p>

            <p className="text-3xl font-semibold text-white mt-8">
              ₹
              {analytics.totalInvestmentCapacity.toLocaleString(
                "en-IN"
              )}
              L
            </p>

            <p className="text-xs text-emerald-400 mt-2">
              Potential capital available
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">

                <p className="text-xs text-slate-500">
                  Investors
                </p>

                <p className="text-xl font-semibold text-white mt-1">
                  {safeInvestors.length}
                </p>

              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">

                <p className="text-xs text-slate-500">
                  Deals
                </p>

                <p className="text-xl font-semibold text-white mt-1">
                  {safeDeals.length}
                </p>

              </div>

            </div>

          </div>

        </div>
{/* Industry Distribution Chart */}
<div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
  <div className="mb-6">
    <h2 className="font-semibold text-white">
      Industry Distribution
    </h2>

    <p className="text-xs text-slate-500 mt-1">
      Deal opportunities across industries
    </p>
  </div>

  <IndustryDistributionChart data={industryData} />
</div>

{/* Investor Composition Chart */}
<div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
  <div className="mb-6">
    <h2 className="font-semibold text-white">
      Investor Composition
    </h2>

    <p className="text-xs text-slate-500 mt-1">
      Investor profiles by investor type
    </p>
  </div>

  <InvestorCompositionChart
    data={investorTypeData}
  />
</div>

        {/* Top Opportunities */}
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900">

          <div className="p-6 border-b border-slate-800">

            <h2 className="font-semibold text-white">
              Top Opportunities
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Highest expected returns in the current pipeline
            </p>

          </div>

          <div className="divide-y divide-slate-800">

            {topOpportunities.length === 0 ? (
              <div className="p-6">

                <p className="text-sm text-slate-600">
                  No opportunities available.
                </p>

              </div>
            ) : (
              topOpportunities.map((deal) => (

                <div
                  key={deal.id}
                  className="p-5 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition"
                >

                  <div className="min-w-0">

                    <h3 className="font-medium text-white truncate">
                      {deal.companyName}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      {deal.industry} ·{" "}
                      {deal.fundingStage}
                    </p>

                  </div>

                  <div className="text-right shrink-0">

                    <p className="font-semibold text-emerald-400">
                      {deal.expectedROI}%
                    </p>

                    <p className="text-xs text-slate-500">
                      Expected ROI
                    </p>

                  </div>

                </div>

              ))
            )}

          </div>

        </div>

      </div>
    </DashboardShell>
  );
}