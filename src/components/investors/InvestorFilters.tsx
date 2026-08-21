"use client";

import type {
  InvestorFilters as InvestorFilterState,
} from "@/hooks/useInvestors";
import type { Investor } from "@/types/investor";

interface InvestorFiltersProps {
  filters: InvestorFilterState;
  updateFilter: <K extends keyof InvestorFilterState>(
    key: K,
    value: InvestorFilterState[K]
  ) => void;
  clearFilters: () => void;
}

const investorTypes: Array<
  Investor["type"] | "All"
> = [
  "All",
  "Individual",
  "Angel Investor",
  "VC Fund",
  "Corporate Investor",
];

const riskLevels: Array<
  Investor["riskPreference"] | "All"
> = [
  "All",
  "Low",
  "Medium",
  "High",
];

export default function InvestorFilters({
  filters,
  updateFilter,
  clearFilters,
}: InvestorFiltersProps) {
  const hasFilters =
    Boolean(filters.search) ||
    Boolean(filters.type && filters.type !== "All") ||
    Boolean(
      filters.riskPreference &&
        filters.riskPreference !== "All"
    ) ||
    filters.minCapacity !== undefined;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">


{/* Search */}
<div>
  <label
    htmlFor="investor-search"
    className="block text-xs text-slate-500 mb-2"
  >
    Search Investors
  </label>

  <input
    id="investor-search"
    type="text"
    value={filters.search ?? ""}
    onChange={(event) =>
      updateFilter("search", event.target.value)
    }
    placeholder="Search name, company, industry..."
    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500"
  />
</div>
        {/* Investor Type */}
        <div>
          <label
            htmlFor="investor-type"
            className="block text-xs text-slate-500 mb-2"
          >
            Investor Type
          </label>

          <select
            id="investor-type"
            value={filters.type ?? "All"}
            onChange={(event) =>
              updateFilter(
                "type",
                event.target.value as Investor["type"] | "All"
              )
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-cyan-500"
          >
            {investorTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Risk Preference */}
        <div>
          <label
            htmlFor="investor-risk"
            className="block text-xs text-slate-500 mb-2"
          >
            Risk Preference
          </label>

          <select
            id="investor-risk"
            value={
              filters.riskPreference ?? "All"
            }
            onChange={(event) =>
              updateFilter(
                "riskPreference",
                event.target.value as
                  | Investor["riskPreference"]
                  | "All"
              )
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-cyan-500"
          >
            {riskLevels.map((risk) => (
              <option key={risk} value={risk}>
                {risk}
              </option>
            ))}
          </select>
        </div>

        {/* Minimum Capacity */}
        <div>
          <label
            htmlFor="minimum-capacity"
            className="block text-xs text-slate-500 mb-2"
          >
            Minimum Capacity
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
              ₹
            </span>

            <input
              id="minimum-capacity"
              type="number"
              min="0"
              value={
                filters.minCapacity ?? ""
              }
              onChange={(event) => {
                const value =
                  event.target.value;

                updateFilter(
                  "minCapacity",
                  value === ""
                    ? undefined
                    : Number(value)
                );
              }}
              placeholder="Minimum capacity"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-7 pr-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Clear */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={clearFilters}
            disabled={!hasFilters}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-400 transition hover:border-slate-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear Filters
          </button>
        </div>

      </div>
    </div>
  );
}