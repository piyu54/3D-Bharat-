"use client";

import Link from "next/link";

import type { RecommendedDeal } from "@/utils/recommendationEngine";

interface DealRecommendationsProps {
  deals: RecommendedDeal[];
}

export default function DealRecommendations({
  deals,
}: DealRecommendationsProps) {
  if (deals.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold text-white">
          Recommended Opportunities
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          No recommendations available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Recommended Opportunities
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Deals ranked using your investment preferences
            </p>
          </div>

          <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-400">
            AI-style matching
          </span>
        </div>
      </div>

      <div className="divide-y divide-slate-800">
        {deals.map((deal) => (
          <Link
            key={deal.id}
            href={`/deals/${deal.id}`}
            className="block p-5 transition hover:bg-slate-800/40"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Company */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate font-medium text-white">
                    {deal.companyName}
                  </h3>

                  <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                    {deal.industry}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  {deal.fundingStage} · {deal.location}
                </p>
              </div>

              {/* Score */}
              <div className="flex items-center gap-5">
                <div className="text-right">
                  <p className="text-xs text-slate-500">
                    Match Score
                  </p>

                  <p className="mt-1 text-2xl font-bold text-cyan-400">
                    {deal.matchScore}%
                  </p>
                </div>

                <div className="hidden h-10 w-px bg-slate-800 sm:block" />

                <div>
                  <p className="text-xs text-slate-500">
                    Expected ROI
                  </p>

                  <p className="mt-1 font-semibold text-emerald-400">
                    {deal.expectedROI}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Risk
                  </p>

                  <p className="mt-1 font-medium text-white">
                    {deal.riskLevel}
                  </p>
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <ScoreItem
                label="Risk"
                value={deal.scoreBreakdown.riskMatch}
              />

              <ScoreItem
                label="Industry"
                value={deal.scoreBreakdown.industryMatch}
              />

              <ScoreItem
                label="Budget"
                value={deal.scoreBreakdown.budgetCompatibility}
              />

              <ScoreItem
                label="ROI"
                value={deal.scoreBreakdown.roiAttractiveness}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

interface ScoreItemProps {
  label: string;
  value: number;
}

function ScoreItem({
  label,
  value,
}: ScoreItemProps) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {label}
        </span>

        <span className="text-xs font-medium text-slate-300">
          {value}/25
        </span>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-cyan-400 transition-all"
          style={{
            width: `${(value / 25) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}