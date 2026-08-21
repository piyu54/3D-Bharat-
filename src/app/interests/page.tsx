"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import DashboardShell from "@/components/layout/DashboardShell";
import { useInterests } from "@/hooks/useInterests";
import { getDealById } from "@/services/dealService";
import type { Deal } from "@/types/deal";

export default function InterestsPage() {
  const {
    interests,
    removeInterest,
  } = useInterests();

  const [deals, setDeals] = useState<Deal[]>([]);
  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  useEffect(() => {
    let active = true;

    const loadInterestedDeals = async () => {
      if (interests.length === 0) {
        setDeals([]);
        setStatus("success");
        return;
      }

      setStatus("loading");

      try {
        const results = await Promise.all(
          interests.map((id) => getDealById(id))
        );

        if (!active) {
          return;
        }

        const validDeals = results.filter(
          (deal): deal is Deal => Boolean(deal)
        );

        setDeals(validDeals);
        setStatus("success");
      } catch (error) {
        console.error(
          "Failed to load interested deals:",
          error
        );

        if (!active) {
          return;
        }

        setStatus("error");
      }
    };

    loadInterestedDeals();

    return () => {
      active = false;
    };
  }, [interests]);

  return (
    <DashboardShell>
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm text-cyan-400 mb-2">
            Your Investment Workspace
          </p>

          <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white">
            My Interests
          </h1>

          <p className="text-slate-400 mt-2">
            Keep track of investment opportunities you may
            want to explore later.
          </p>

        </div>

        {/* Summary */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 mb-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Saved Opportunities
              </p>

              <p className="text-2xl font-semibold text-white mt-2">
                {interests.length}
              </p>
            </div>

            <div className="h-11 w-11 rounded-lg bg-cyan-500/10 flex items-center justify-center text-xl">
              ♡
            </div>

          </div>

        </div>

        {/* Loading */}
        {status === "loading" && (

          <div className="space-y-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 rounded-xl border border-slate-800 bg-slate-900 animate-pulse"
              />
            ))}

          </div>

        )}

        {/* Error */}
        {status === "error" && (

          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-8">

            <h2 className="font-medium text-red-400">
              Unable to load your interests
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Please refresh the page and try again.
            </p>

          </div>

        )}

        {/* Empty */}
        {status === "success" && deals.length === 0 && (

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-12 text-center">

            <div className="text-4xl mb-4">
              ♡
            </div>

            <h2 className="text-lg font-medium text-white">
              No saved opportunities yet
            </h2>

            <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
              When you find an investment opportunity that
              interests you, add it here so you can review it
              later.
            </p>

            <Link
              href="/deals"
              className="inline-flex mt-6 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
            >
              Explore Deals
            </Link>

          </div>

        )}

        {/* Interested Deals */}
        {status === "success" && deals.length > 0 && (

          <div className="space-y-3">

            {deals.map((deal) => (

              <div
                key={deal.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700 hover:bg-slate-800/60"
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  {/* Company */}
                  <div className="min-w-0">

                    <div className="flex items-center gap-3">

                      <h2 className="text-lg font-medium text-white">
                        {deal.companyName}
                      </h2>

                      <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-400">
                        Interested
                      </span>

                    </div>

                    <p className="text-sm text-slate-500 mt-1">
                      {deal.industry} · {deal.location}
                    </p>

                    <p className="text-sm text-slate-400 mt-3 line-clamp-2">
                      {deal.description}
                    </p>

                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 lg:min-w-[520px]">

                    <div>
                      <p className="text-xs text-slate-500">
                        Expected ROI
                      </p>

                      <p className="text-lg font-semibold text-emerald-400 mt-1">
                        {deal.expectedROI}%
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Investment
                      </p>

                      <p className="text-sm font-medium text-white mt-1">
                        ₹{deal.minimumInvestment}L
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Risk
                      </p>

                      <p className="text-sm font-medium text-white mt-1">
                        {deal.riskLevel}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Stage
                      </p>

                      <p className="text-sm font-medium text-white mt-1">
                        {deal.fundingStage}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 mt-5 pt-4 border-t border-slate-800">

                  <button
                    type="button"
                    onClick={() => removeInterest(deal.id)}
                    className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400 transition hover:border-red-500/40 hover:text-red-400"
                  >
                    Remove
                  </button>

                  <Link
                    href={`/deals/${deal.id}`}
                    className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
                  >
                    View Deal
                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </DashboardShell>
  );
}