"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardShell from "@/components/layout/DashboardShell";
import { getDealById } from "@/services/dealService";
import type { Deal } from "@/types/deal";
import type { RootState, AppDispatch } from "@/store";
import { toggleInterest } from "@/store/slices/interestsSlice";

interface DealDetailPageProps {
  params: Promise<{
    dealId: string;
  }>;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const getRiskClasses = (risk: Deal["riskLevel"]) => {
  switch (risk) {
    case "Low":
      return "bg-green-100 text-green-700";
    case "Medium":
      return "bg-yellow-100 text-yellow-700";
    case "High":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getStatusClasses = (status: Deal["status"]) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-700";
    case "Closing Soon":
      return "bg-orange-100 text-orange-700";
    case "Fully Funded":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function DealDetailPage({
  params,
}: DealDetailPageProps) {
  const dispatch = useDispatch<AppDispatch>();

  const interestedDealIds = useSelector(
    (state: RootState) => state.interests.dealIds
  );

  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isInterested =
    deal !== null &&
    interestedDealIds.includes(deal.id);

  useEffect(() => {
    const loadDeal = async () => {
      try {
        setLoading(true);
        setError("");

        const { dealId } = await params;
        const result = await getDealById(dealId);

        if (!result) {
          setError("Deal not found.");
          return;
        }

        setDeal(result);
      } catch {
        setError(
          "Unable to load this deal. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDeal();
  }, [params]);

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />

            <p className="text-sm text-gray-500">
              Loading deal details...
            </p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  if (error || !deal) {
    return (
      <DashboardShell>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="max-w-md text-center">
            <div className="mb-4 text-5xl">⚠️</div>

            <h1 className="text-2xl font-semibold text-gray-900">
              Deal Not Found
            </h1>

            <p className="mt-2 text-gray-500">
              {error ||
                "The requested deal could not be found."}
            </p>

            <Link
              href="/deals"
              className="mt-6 inline-flex rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              ← Back to Deals
            </Link>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="space-y-6">

        {/* Back */}
        <Link
          href="/deals"
          className="inline-flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          ← Back to Deals
        </Link>

        {/* Header */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

            <div>
              <div className="flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {deal.industry}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getRiskClasses(
                    deal.riskLevel
                  )}`}
                >
                  {deal.riskLevel} Risk
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(
                    deal.status
                  )}`}
                >
                  {deal.status}
                </span>

              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                {deal.companyName}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                📍 {deal.location}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-5 lg:min-w-[220px]">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Expected ROI
              </p>

              <p className="mt-1 text-3xl font-bold text-gray-900">
                {deal.expectedROI}%
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Projected return
              </p>
            </div>

          </div>
        </div>

        {/* Overview */}
        <div className="grid gap-6 lg:grid-cols-3">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">

            <h2 className="text-lg font-semibold text-gray-900">
              Company Overview
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              {deal.description}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Funding Stage
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  {deal.fundingStage}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Founded
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  {deal.foundedYear}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Employees
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  {deal.employees}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Existing Investors
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  {deal.investorCount}
                </p>
              </div>

            </div>
          </div>

          {/* Investment */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-gray-900">
              Investment Details
            </h2>

            <div className="mt-5 space-y-5">

              <div>
                <p className="text-xs text-gray-500">
                  Minimum Investment
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {formatCurrency(deal.minimumInvestment)}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Funding Required
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {formatCurrency(deal.fundingRequired)}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Company Valuation
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {formatCurrency(deal.valuation)}
                </p>
              </div>

              {/* Express Interest */}
              <button
                type="button"
                onClick={() => dispatch(toggleInterest(deal.id))}
                className={`w-full rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  isInterested
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {isInterested
                  ? "✓ Interest Expressed"
                  : "Express Interest"}
              </button>

            </div>
          </div>

        </div>

        {/* Financial Metrics */}
        <div>

          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Financial Performance
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-500">
                Revenue
              </p>

              <p className="mt-2 text-xl font-bold text-gray-900">
                {formatCurrency(deal.revenue)}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-500">
                Revenue Growth
              </p>

              <p className="mt-2 text-xl font-bold text-green-600">
                {deal.revenueGrowth}%
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-500">
                EBITDA Margin
              </p>

              <p className="mt-2 text-xl font-bold text-gray-900">
                {deal.ebitdaMargin}%
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-500">
                Investor Interest
              </p>

              <p className="mt-2 text-xl font-bold text-gray-900">
                {deal.interest}%
              </p>
            </div>

          </div>
        </div>

        {/* Funding Progress */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Funding Progress
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Current funding progress for this opportunity
              </p>
            </div>

            <span className="text-lg font-bold text-gray-900">
              {deal.fundingProgress}%
            </span>

          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100">

            <div
              className="h-full rounded-full bg-gray-900 transition-all"
              style={{
                width: `${Math.min(
                  Math.max(deal.fundingProgress, 0),
                  100
                )}%`,
              }}
            />

          </div>

          <div className="mt-3 flex justify-between text-xs text-gray-500">

            <span>Funding Required</span>

            <span>
              {formatCurrency(deal.fundingRequired)}
            </span>

          </div>

        </div>

      </div>
    </DashboardShell>
  );
}