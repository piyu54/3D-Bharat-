"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import DashboardShell from "@/components/layout/DashboardShell";
import { getDealById } from "@/services/dealService";
import type { Deal } from "@/types/deal";

export default function DealDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [deal, setDeal] = useState<Deal | null>(null);
  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  useEffect(() => {
    const loadDeal = async () => {
      try {
        setStatus("loading");

        const result = await getDealById(id);

        if (!result) {
          setStatus("error");
          return;
        }

        setDeal(result);
        setStatus("success");
      } catch (error) {
        console.error("Failed to load deal:", error);
        setStatus("error");
      }
    };

    loadDeal();
  }, [id]);

  if (status === "loading") {
    return (
      <DashboardShell>
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
          <div className="animate-pulse space-y-4">

            <div className="h-4 w-32 bg-slate-800 rounded" />

            <div className="h-10 w-96 bg-slate-800 rounded" />

            <div className="h-32 bg-slate-900 border border-slate-800 rounded-xl" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-28 bg-slate-900 border border-slate-800 rounded-xl"
                />
              ))}
            </div>

          </div>
        </div>
      </DashboardShell>
    );
  }

  if (status === "error" || !deal) {
    return (
      <DashboardShell>
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">

          <Link
            href="/deals"
            className="text-sm text-cyan-400 hover:text-cyan-300"
          >
            ← Back to Deal Explorer
          </Link>

          <div className="mt-8 rounded-xl border border-red-900/50 bg-red-950/20 p-8">
            <h1 className="text-xl font-semibold text-white">
              Deal not found
            </h1>

            <p className="text-sm text-slate-400 mt-2">
              We couldn't find the investment opportunity you're
              looking for.
            </p>
          </div>

        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">

        {/* Back */}
        <Link
          href="/deals"
          className="text-sm text-cyan-400 hover:text-cyan-300 transition"
        >
          ← Back to Deal Explorer
        </Link>

        {/* Header */}
        <div className="mt-6">

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

            <div>

              <div className="flex items-center gap-3">

                <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight">
                  {deal.companyName}
                </h1>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                  {deal.status}
                </span>

              </div>

              <p className="text-slate-400 mt-3">
                {deal.industry} · {deal.location}
              </p>

              <p className="text-slate-500 mt-2 max-w-3xl">
                {deal.description}
              </p>

            </div>

            <button
              type="button"
              className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-medium text-slate-950 hover:bg-cyan-400 transition"
            >
              Add to Interests
            </button>

          </div>

        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">

          <MetricCard
            label="Expected ROI"
            value={`${deal.expectedROI}%`}
            valueClass="text-emerald-400"
          />

          <MetricCard
            label="Minimum Investment"
            value={`₹${deal.minimumInvestment}L`}
          />

          <MetricCard
            label="Risk Level"
            value={deal.riskLevel}
            valueClass={
              deal.riskLevel === "Low"
                ? "text-emerald-400"
                : deal.riskLevel === "Medium"
                  ? "text-amber-400"
                  : "text-red-400"
            }
          />

          <MetricCard
            label="Funding Stage"
            value={deal.fundingStage}
          />

        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">

          {/* Financial Metrics */}
          <div className="xl:col-span-2 rounded-xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="font-semibold text-white">
              Financial Overview
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Key financial information for this opportunity
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">

              <InfoItem
                label="Funding Stage"
                value={deal.fundingStage}
              />

              <InfoItem
                label="Industry"
                value={deal.industry}
              />

              <InfoItem
                label="Location"
                value={deal.location}
              />

              <InfoItem
                label="Expected ROI"
                value={`${deal.expectedROI}%`}
              />

              <InfoItem
                label="Minimum Investment"
                value={`₹${deal.minimumInvestment}L`}
              />

              <InfoItem
                label="Risk Level"
                value={deal.riskLevel}
              />

            </div>

          </div>

          {/* Risk Analysis */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="font-semibold text-white">
              Risk Analysis
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Current assessment
            </p>

            <div className="mt-8">

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Risk profile
                </span>

                <span className="text-sm font-medium text-white">
                  {deal.riskLevel}
                </span>
              </div>

              <div className="mt-4 h-2 rounded-full bg-slate-800 overflow-hidden">

                <div
                  className={`h-full rounded-full ${
                    deal.riskLevel === "Low"
                      ? "w-1/3 bg-emerald-400"
                      : deal.riskLevel === "Medium"
                        ? "w-2/3 bg-amber-400"
                        : "w-full bg-red-400"
                  }`}
                />

              </div>

              <p className="text-xs text-slate-500 mt-4 leading-5">
                Risk assessment is based on simulated deal
                characteristics including funding stage, expected
                return, and investment profile.
              </p>

            </div>

          </div>

        </div>

        {/* ROI Projection */}
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-semibold text-white">
                ROI Projection
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Simulated expected return trajectory
              </p>
            </div>

            <span className="text-sm font-semibold text-emerald-400">
              {deal.expectedROI}% projected
            </span>

          </div>

          <div className="mt-8 h-48 flex items-end gap-3">

            {[35, 44, 52, 63, 72, 82, 100].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-md bg-cyan-500/20 relative"
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-t-md bg-cyan-400/70"
                    style={{
                      height: `${height}%`,
                    }}
                  />
                </div>
              )
            )}

          </div>

          <div className="flex justify-between text-xs text-slate-600 mt-3">
            <span>Year 1</span>
            <span>Year 2</span>
            <span>Year 3</span>
            <span>Year 4</span>
            <span>Year 5</span>
          </div>

        </div>

      </div>
    </DashboardShell>
  );
}

function MetricCard({
  label,
  value,
  valueClass = "text-white",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <p className="text-sm text-slate-400">
        {label}
      </p>

      <p className={`text-2xl font-semibold mt-3 ${valueClass}`}>
        {value}
      </p>

    </div>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="text-sm font-medium text-white mt-1">
        {value}
      </p>
    </div>
  );
}