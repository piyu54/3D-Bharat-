"use client";

import DealFilters from "@/components/deals/DealFilters";
import DashboardShell from "@/components/layout/DashboardShell";
import { useDealExplorer } from "@/hooks/useDealExplorer";

export default function DealsPage() {
const {
  deals,
  total,
  page,
  totalPages,
  status,
  error,
  retry,
  filters,
  updateFilter,
  clearFilters,
  sortBy,
  changeSort,
  changePage,
} = useDealExplorer({
  pageSize: 10,
});

  return (
    <DashboardShell>
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm text-cyan-400 mb-2">
            Investment Opportunities
          </p>

          <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight">
            Deal Explorer
          </h1>

          <p className="text-slate-400 mt-2">
            Explore investment opportunities across industries,
            risk levels, and expected returns.
          </p>

        </div>

        {/* Search */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 mb-4">

          <div className="relative">

            <input
          type="text"
          value={filters.search ?? ""}
          onChange={(event) =>
           updateFilter("search", event.target.value)
           }
          placeholder="Search companies, industries, locations..."
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 pl-11 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500"
          />

            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />

              <path d="m20 20-3.5-3.5" />
            </svg>

          </div>

        </div>

        <div className="mb-6">
        <DealFilters
        filters={filters}
        updateFilter={updateFilter}
        clearFilters={clearFilters}
        />
        </div>

        {/* Results Summary + Sorting */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">

  <div>
    <p className="text-sm text-slate-400">
      {status === "loading"
        ? "Loading opportunities..."
        : `${total} opportunities found`}
    </p>

    {total > 0 && (
      <p className="text-xs text-slate-600 mt-1">
        Showing {(page - 1) * 10 + 1}–
        {Math.min(page * 10, total)} opportunities
      </p>
    )}
  </div>

  <div className="flex items-center gap-3">

    <label
      htmlFor="deal-sort"
      className="text-xs text-slate-500"
    >
      Sort by
    </label>

    <select
      id="deal-sort"
      value={sortBy}
      onChange={(event) =>
        changeSort(
          event.target.value as typeof sortBy
        )
      }
      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
    >
      <option value="newest">
        Newest
      </option>

      <option value="oldest">
        Oldest
      </option>

      <option value="roi-high">
        ROI: High to Low
      </option>

      <option value="roi-low">
        ROI: Low to High
      </option>

      <option value="investment-high">
        Investment: High to Low
      </option>

      <option value="investment-low">
        Investment: Low to High
      </option>
    </select>

  </div>

</div>
       

        {/* Error State */}
        {status === "error" && (

          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6 mb-4">

            <p className="text-sm text-red-400">
              {error}
            </p>

            <button
              onClick={retry}
              className="mt-3 text-sm text-cyan-400 hover:text-cyan-300"
            >
              Try again
            </button>

          </div>

        )}

        {/* Loading State */}
        {status === "loading" && (

          <div className="space-y-3">

            {[1, 2, 3, 4, 5].map((item) => (

              <div
                key={item}
                className="h-24 rounded-xl border border-slate-800 bg-slate-900 animate-pulse"
              />

            ))}

          </div>

        )}

        {/* Deal List */}
        {status === "success" && (

          <div className="space-y-3">

            {deals.map((deal) => (

              <div
                key={deal.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700 hover:bg-slate-800/60"
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  {/* Company */}
                  <div className="min-w-0">

                    <h2 className="text-lg font-medium text-white">
                      {deal.companyName}
                    </h2>

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

              </div>

            ))}

          </div>

        )}

        {/* Empty State */}
        {status === "success" && deals.length === 0 && (

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-12 text-center">

            <h2 className="font-medium text-white">
              No opportunities found
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Try changing your search or filters.
            </p>

          </div>

        )}

        {/* Pagination */}
        {status === "success" && totalPages > 1 && (

          <div className="flex items-center justify-center gap-2 mt-6">

            <button
  type="button"
  onClick={() => changePage(page - 1)}
  disabled={page <= 1}
  className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-400 transition hover:border-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
>
  Previous
</button>

            <span className="px-4 text-sm text-slate-500">
              {page} / {totalPages}
            </span>

            <button
  type="button"
  onClick={() => changePage(page + 1)}
  disabled={page >= totalPages}
  className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-400 transition hover:border-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
>
  Next
</button>

          </div>

        )}

      </div>
    </DashboardShell>
  );
}