"use client";

import type { DealFilters as DealFilterValues } from "@/services/dealService";
import type { RiskLevel } from "@/types/deal";

interface DealFiltersProps {
  filters: DealFilterValues;
  updateFilter: <K extends keyof DealFilterValues>(
    key: K,
    value: DealFilterValues[K]
  ) => void;
  clearFilters: () => void;
}

const industries = [
  "All",
  "FinTech",
  "HealthTech",
  "EdTech",
  "CleanTech",
  "AgriTech",
  "SaaS",
  "E-Commerce",
  "AI",
];

const riskLevels: Array<RiskLevel | "All"> = [
  "All",
  "Low",
  "Medium",
  "High",
];

const fundingStages = [
  "All",
  "Pre-Seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C",
];

const statuses = [
  "All",
  "Open",
  "Closing Soon",
  "Closed",
];

export default function DealFilters({
  filters,
  updateFilter,
  clearFilters,
}: DealFiltersProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="font-semibold">
            Filter Opportunities
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Narrow deals based on your investment preferences.
          </p>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="text-xs text-cyan-400 hover:text-cyan-300 transition"
        >
          Clear all
        </button>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Industry */}
        <div>
          <label className="text-xs text-slate-500">
            Industry
          </label>

          <select
            value={filters.industry ?? "All"}
            onChange={(event) =>
              updateFilter(
                "industry",
                event.target.value
              )
            }
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
          >
            {industries.map((industry) => (
              <option
                key={industry}
                value={industry}
              >
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Risk */}
        <div>
          <label className="text-xs text-slate-500">
            Risk Level
          </label>

          <select
            value={filters.riskLevel ?? "All"}
            onChange={(event) =>
              updateFilter(
                "riskLevel",
                event.target.value as RiskLevel | "All"
              )
            }
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
          >
            {riskLevels.map((risk) => (
              <option
                key={risk}
                value={risk}
              >
                {risk}
              </option>
            ))}
          </select>
        </div>

        {/* Funding Stage */}
        <div>
          <label className="text-xs text-slate-500">
            Funding Stage
          </label>

          <select
            value={filters.fundingStage ?? "All"}
            onChange={(event) =>
              updateFilter(
                "fundingStage",
                event.target.value
              )
            }
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
          >
            {fundingStages.map((stage) => (
              <option
                key={stage}
                value={stage}
              >
                {stage}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="text-xs text-slate-500">
            Deal Status
          </label>

          <select
            value={filters.status ?? "All"}
            onChange={(event) =>
              updateFilter(
                "status",
                event.target.value
              )
            }
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
          >
            {statuses.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Numeric Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">

        {/* Minimum ROI */}
        <div>
          <label className="text-xs text-slate-500">
            Minimum ROI (%)
          </label>

          <input
            type="number"
            min="0"
            value={filters.minROI ?? ""}
            onChange={(event) =>
              updateFilter(
                "minROI",
                event.target.value
                  ? Number(event.target.value)
                  : undefined
              )
            }
            placeholder="e.g. 15"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-500"
          />
        </div>

        {/* Maximum ROI */}
        <div>
          <label className="text-xs text-slate-500">
            Maximum ROI (%)
          </label>

          <input
            type="number"
            min="0"
            value={filters.maxROI ?? ""}
            onChange={(event) =>
              updateFilter(
                "maxROI",
                event.target.value
                  ? Number(event.target.value)
                  : undefined
              )
            }
            placeholder="e.g. 40"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-500"
          />
        </div>

        {/* Minimum Investment */}
        <div>
          <label className="text-xs text-slate-500">
            Minimum Investment (₹L)
          </label>

          <input
            type="number"
            min="0"
            value={filters.minInvestment ?? ""}
            onChange={(event) =>
              updateFilter(
                "minInvestment",
                event.target.value
                  ? Number(event.target.value)
                  : undefined
              )
            }
            placeholder="e.g. 10"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-500"
          />
        </div>

        {/* Maximum Investment */}
        <div>
          <label className="text-xs text-slate-500">
            Maximum Investment (₹L)
          </label>

          <input
            type="number"
            min="0"
            value={filters.maxInvestment ?? ""}
            onChange={(event) =>
              updateFilter(
                "maxInvestment",
                event.target.value
                  ? Number(event.target.value)
                  : undefined
              )
            }
            placeholder="e.g. 100"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-500"
          />
        </div>

      </div>

    </div>
  );
}