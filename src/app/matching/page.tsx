"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import DashboardShell from "@/components/layout/DashboardShell";
import { getDeals } from "@/services/dealService";

import type {
  Deal,
  RiskLevel,
} from "@/types/deal";

import {
  getRecommendedDeals,
  type RecommendationPreferences,
  type ScoredDeal,
} from "@/utils/recommendation";

export default function MatchingPage() {
  const [deals, setDeals] = useState<Deal[]>([]);

  const [preferences, setPreferences] =
    useState<RecommendationPreferences>({
      riskLevel: "All",
      industry: "All",
      budget: 0,
      minROI: 0,
    });

  const [recommendations, setRecommendations] =
    useState<ScoredDeal[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /*
   * ============================================
   * LOAD DEALS
   * ============================================
   */

  useEffect(() => {
    let active = true;

    const loadDeals = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getDeals({
          page: 1,
          pageSize: 100,
        });

        if (!active) {
          return;
        }

        const data = Array.isArray(response?.data)
          ? response.data
          : [];

        setDeals(data);
      } catch (err) {
        console.error(
          "Failed to load matching deals:",
          err
        );

        if (!active) {
          return;
        }

        setDeals([]);

        setError(
          "Unable to load recommendation data."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadDeals();

    return () => {
      active = false;
    };
  }, []);

  /*
   * ============================================
   * INDUSTRIES
   * ============================================
   */

  const industries = useMemo(() => {
    return Array.from(
      new Set(
        deals
          .map((deal) => deal.industry)
          .filter(Boolean)
      )
    ).sort();
  }, [deals]);

  /*
   * ============================================
   * GENERATE RECOMMENDATIONS
   * ============================================
   */

  const generateRecommendations =
    useCallback(() => {
      const scored = getRecommendedDeals(
        deals,
        preferences,
        5
      );

      setRecommendations(scored);
    }, [deals, preferences]);

  /*
   * ============================================
   * GENERATE AFTER DEALS LOAD
   * ============================================
   */

  useEffect(() => {
    if (deals.length > 0) {
      generateRecommendations();
    } else {
      setRecommendations([]);
    }
  }, [
    deals,
    generateRecommendations,
  ]);

  /*
   * ============================================
   * UPDATE PREFERENCE
   * ============================================
   */

  const updatePreference = <
    K extends keyof RecommendationPreferences
  >(
    key: K,
    value: RecommendationPreferences[K]
  ) => {
    setPreferences((current) => ({
      ...current,
      [key]: value,
    }));
  };

  /*
   * ============================================
   * RESET
   * ============================================
   */

  const resetPreferences = () => {
    setPreferences({
      riskLevel: "All",
      industry: "All",
      budget: 0,
      minROI: 0,
    });
  };

  /*
   * ============================================
   * LOADING
   * ============================================
   */

  if (loading) {
    return (
      <DashboardShell>
        <div className="mx-auto max-w-[1600px] p-6 lg:p-8">
          <div className="animate-pulse space-y-5">
            <div className="h-8 w-72 rounded bg-slate-800" />

            <div className="h-4 w-[500px] max-w-full rounded bg-slate-800" />

            <div className="h-48 rounded-xl border border-slate-800 bg-slate-900" />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-64 rounded-xl border border-slate-800 bg-slate-900"
                />
              ))}
            </div>
          </div>
        </div>
      </DashboardShell>
    );
  }

  /*
   * ============================================
   * ERROR
   * ============================================
   */

  if (error) {
    return (
      <DashboardShell>
        <div className="mx-auto max-w-[1600px] p-6 lg:p-8">
          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-8">
            <h1 className="text-xl font-semibold text-red-400">
              Recommendation Engine Error
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  /*
   * ============================================
   * DASHBOARD
   * ============================================
   */

  return (
    <DashboardShell>
      <div className="mx-auto max-w-[1600px] p-6 lg:p-8">

        {/* HEADER */}

        <div className="mb-8">
          <p className="mb-2 text-sm text-cyan-400">
            AI-Inspired Investment Matching
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
            Deal Recommendations
          </h1>

          <p className="mt-2 max-w-3xl text-slate-400">
            Find investment opportunities based on
            your preferred risk, industry, budget,
            and expected return.
          </p>
        </div>

        {/* ======================================
            PREFERENCES
        ====================================== */}

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              Investor Preferences
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Adjust your preferences to improve
              deal matching.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            {/* RISK */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Risk Level
              </label>

              <select
                value={preferences.riskLevel}
                onChange={(event) => {
                  const value =
                    event.target.value;

                  updatePreference(
                    "riskLevel",
                    value as
                      | RiskLevel
                      | "All"
                  );
                }}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
              >
                <option value="All">
                  Any Risk
                </option>

                <option value="Low">
                  Low Risk
                </option>

                <option value="Medium">
                  Medium Risk
                </option>

                <option value="High">
                  High Risk
                </option>
              </select>
            </div>

            {/* INDUSTRY */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Industry
              </label>

              <select
                value={preferences.industry}
                onChange={(event) => {
                  updatePreference(
                    "industry",
                    event.target.value
                  );
                }}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
              >
                <option value="All">
                  Any Industry
                </option>

                {industries.map(
                  (industry) => (
                    <option
                      key={industry}
                      value={industry}
                    >
                      {industry}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* BUDGET */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Maximum Budget
              </label>

              <input
                type="number"
                min="0"
                value={
                  preferences.budget || ""
                }
                placeholder="₹ e.g. 5000000"
                onChange={(event) => {
                  updatePreference(
                    "budget",
                    Number(
                      event.target.value
                    )
                  );
                }}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-500"
              />
            </div>

            {/* ROI */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Minimum ROI
              </label>

              <input
                type="number"
                min="0"
                value={
                  preferences.minROI || ""
                }
                placeholder="e.g. 15"
                onChange={(event) => {
                  updatePreference(
                    "minROI",
                    Number(
                      event.target.value
                    )
                  );
                }}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* BUTTONS */}

          <div className="mt-5 flex flex-wrap gap-3">

            <button
              type="button"
              onClick={
                generateRecommendations
              }
              className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Find Best Matches
            </button>

            <button
              type="button"
              onClick={
                resetPreferences
              }
              className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              Reset
            </button>
          </div>
        </div>

        {/* ======================================
            RESULTS HEADER
        ====================================== */}

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <h2 className="text-xl font-semibold text-white">
              Recommended Deals
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Ranked by your personalized match
              score.
            </p>
          </div>

          <div className="text-sm text-slate-500">
            {recommendations.length} deals
            analyzed
          </div>
        </div>

        {/* ======================================
            RESULTS
        ====================================== */}

        {recommendations.length === 0 ? (
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-10 text-center">

            <h3 className="text-lg font-semibold text-white">
              No recommendations available
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your investment
              preferences.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

            {recommendations.map(
              (item) => (
                <div
                  key={item.deal.id}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-slate-700"
                >

                  {/* TOP */}

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <p className="text-xs text-cyan-400">
                        {item.deal.industry}
                      </p>

                      <h3 className="mt-1 text-lg font-semibold text-white">
                        {
                          item.deal
                            .companyName
                        }
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {
                          item.deal
                            .location
                        }
                      </p>
                    </div>

                    {/* SCORE */}

                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10">

                      <span className="text-xl font-bold text-cyan-400">
                        {Math.round(
                          item.matchScore
                        )}
                      </span>

                      <span className="text-[9px] uppercase text-slate-500">
                        Match
                      </span>
                    </div>
                  </div>

                  {/* MATCH LABEL */}

                  <div className="mt-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.matchScore >=
                        75
                          ? "bg-emerald-500/10 text-emerald-400"
                          : item.matchScore >=
                            50
                          ? "bg-cyan-500/10 text-cyan-400"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {item.matchScore >=
                      75
                        ? "Strong Match"
                        : item.matchScore >=
                          50
                        ? "Good Match"
                        : "Low Match"}
                    </span>
                  </div>

                  {/* METRICS */}

                  <div className="mt-5 grid grid-cols-2 gap-3">

                    <div className="rounded-lg bg-slate-950 p-3">
                      <p className="text-xs text-slate-500">
                        Expected ROI
                      </p>

                      <p className="mt-1 font-semibold text-emerald-400">
                        {
                          item.deal
                            .expectedROI
                        }
                        %
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-950 p-3">
                      <p className="text-xs text-slate-500">
                        Risk
                      </p>

                      <p className="mt-1 font-semibold text-white">
                        {
                          item.deal
                            .riskLevel
                        }
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-950 p-3">
                      <p className="text-xs text-slate-500">
                        Minimum Investment
                      </p>

                      <p className="mt-1 font-semibold text-white">
                        ₹
                        {Number(
                          item.deal
                            .minimumInvestment
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-950 p-3">
                      <p className="text-xs text-slate-500">
                        Funding Stage
                      </p>

                      <p className="mt-1 font-semibold text-white">
                        {
                          item.deal
                            .fundingStage
                        }
                      </p>
                    </div>
                  </div>

                  {/* SCORE BREAKDOWN */}

                  <div className="mt-5 border-t border-slate-800 pt-5">

                    <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                      Match Breakdown
                    </p>

                    <div className="space-y-3">

                      <ScoreRow
                        label="Risk Match"
                        value={
                          item
                            .scoreBreakdown
                            .riskMatch
                        }
                        max={25}
                      />

                      <ScoreRow
                        label="Industry Match"
                        value={
                          item
                            .scoreBreakdown
                            .industryMatch
                        }
                        max={25}
                      />

                      <ScoreRow
                        label="Budget Compatibility"
                        value={
                          item
                            .scoreBreakdown
                            .budgetCompatibility
                        }
                        max={25}
                      />

                      <ScoreRow
                        label="ROI Attractiveness"
                        value={
                          item
                            .scoreBreakdown
                            .roiAttractiveness
                        }
                        max={25}
                      />
                    </div>
                  </div>

                  {/* REASONS */}

                  {item.matchReasons.length >
                    0 && (
                    <div className="mt-5 border-t border-slate-800 pt-5">

                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                        Why this matches
                      </p>

                      <ul className="space-y-1">
                        {item.matchReasons
                          .slice(0, 3)
                          .map(
                            (
                              reason,
                              index
                            ) => (
                              <li
                                key={`${reason}-${index}`}
                                className="text-xs text-slate-400"
                              >
                                • {reason}
                              </li>
                            )
                          )}
                      </ul>
                    </div>
                  )}

                  {/* VIEW DEAL */}

                  <a
                    href={`/deals/${item.deal.id}`}
                    className="mt-5 flex w-full items-center justify-center rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    View Deal →
                  </a>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}

/*
 * ============================================
 * SCORE ROW
 * ============================================
 */

function ScoreRow({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const percentage = Math.max(
    0,
    Math.min(
      100,
      (value / max) * 100
    )
  );

  return (
    <div>
      <div className="flex justify-between text-xs">

        <span className="text-slate-400">
          {label}
        </span>

        <span className="text-white">
          {value}/{max}
        </span>
      </div>

      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-cyan-400"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}