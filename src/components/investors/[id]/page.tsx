"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import DashboardShell from "@/components/layout/DashboardShell";
import { getInvestorById } from "@/services/investorService";

import type { Investor } from "@/types/investor";

export default function InvestorDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [investor, setInvestor] =
    useState<Investor | null>(null);

  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  useEffect(() => {
    let active = true;

    const loadInvestor = async () => {
      setStatus("loading");

      try {
        const response = await getInvestorById(id);

        if (!active) {
          return;
        }

        if (!response) {
          setInvestor(null);
          setStatus("error");
          return;
        }

        setInvestor(response);
        setStatus("success");
      } catch (error) {
        console.error(
          "Failed to load investor:",
          error
        );

        if (!active) {
          return;
        }

        setInvestor(null);
        setStatus("error");
      }
    };

    if (id) {
      loadInvestor();
    }

    return () => {
      active = false;
    };
  }, [id]);

  /* Loading */
  if (status === "loading") {
    return (
      <DashboardShell>
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
          <div className="animate-pulse space-y-4">

            <div className="h-4 w-40 rounded bg-slate-800" />

            <div className="h-10 w-2/3 rounded bg-slate-800" />

            <div className="h-5 w-1/2 rounded bg-slate-800" />

            <div className="h-64 rounded-xl bg-slate-900" />

          </div>
        </div>
      </DashboardShell>
    );
  }

  /* Error */
  if (status === "error" || !investor) {
    return (
      <DashboardShell>
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">

          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm text-cyan-400 hover:text-cyan-300"
          >
            ← Back to investors
          </button>

          <div className="mt-8 rounded-xl border border-red-900/50 bg-red-950/20 p-8">

            <h1 className="text-xl font-semibold text-white">
              Investor not found
            </h1>

            <p className="text-sm text-slate-400 mt-2">
              We couldn't find the investor you're looking for.
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
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-slate-400 hover:text-cyan-400 transition mb-6"
        >
          ← Back to Investor Explorer
        </button>

        {/* Header */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 lg:p-8">

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

            <div>
              <p className="text-sm text-cyan-400 mb-2">
                {investor.type}
              </p>

              <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                {investor.name}
              </h1>

              <p className="text-lg text-slate-300 mt-2">
                {investor.company}
              </p>

              <p className="text-sm text-slate-500 mt-2">
                {investor.location}
              </p>
            </div>

            {/* Risk */}
            <div
              className={`rounded-lg px-4 py-3 ${
                investor.riskPreference === "Low"
                  ? "bg-emerald-500/10"
                  : investor.riskPreference === "Medium"
                  ? "bg-amber-500/10"
                  : "bg-red-500/10"
              }`}
            >
              <p className="text-xs text-slate-500">
                Risk Preference
              </p>

              <p
                className={`text-lg font-semibold mt-1 ${
                  investor.riskPreference === "Low"
                    ? "text-emerald-400"
                    : investor.riskPreference === "Medium"
                    ? "text-amber-400"
                    : "text-red-400"
                }`}
              >
                {investor.riskPreference}
              </p>
            </div>

          </div>

        </div>

        {/* Financial Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-500">
              Investment Capacity
            </p>

            <p className="text-2xl font-semibold text-white mt-2">
              ₹{investor.investmentCapacity}L
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-500">
              Minimum Ticket
            </p>

            <p className="text-2xl font-semibold text-cyan-400 mt-2">
              ₹{investor.minimumTicket}L
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-500">
              Maximum Ticket
            </p>

            <p className="text-2xl font-semibold text-white mt-2">
              ₹{investor.maximumTicket}L
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-500">
              Investor Type
            </p>

            <p className="text-lg font-semibold text-white mt-2">
              {investor.type}
            </p>
          </div>

        </div>

        {/* Main Details */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">

          {/* Profile */}
          <div className="xl:col-span-2 rounded-xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="text-lg font-semibold text-white">
              Investor Profile
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Investment preferences and profile information.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">

              <div>
                <p className="text-xs text-slate-500">
                  Investor
                </p>

                <p className="text-sm text-white mt-1">
                  {investor.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Company
                </p>

                <p className="text-sm text-white mt-1">
                  {investor.company}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Type
                </p>

                <p className="text-sm text-white mt-1">
                  {investor.type}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Location
                </p>

                <p className="text-sm text-white mt-1">
                  {investor.location}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Risk Preference
                </p>

                <p className="text-sm text-white mt-1">
                  {investor.riskPreference}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Investment Capacity
                </p>

                <p className="text-sm text-white mt-1">
                  ₹{investor.investmentCapacity}L
                </p>
              </div>

            </div>

          </div>

          {/* Ticket Range */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="text-lg font-semibold text-white">
              Investment Range
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Typical investment ticket range.
            </p>

            <div className="mt-8">

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Minimum
                </span>

                <span className="text-sm font-medium text-white">
                  ₹{investor.minimumTicket}L
                </span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-slate-400">
                  Maximum
                </span>

                <span className="text-sm font-medium text-white">
                  ₹{investor.maximumTicket}L
                </span>
              </div>

              <div className="mt-6 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full w-full rounded-full bg-cyan-500" />
              </div>

            </div>

          </div>

        </div>

        {/* Preferred Industries */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 mt-4">

          <h2 className="text-lg font-semibold text-white">
            Preferred Industries
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Industries this investor is interested in.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">

            {investor.preferredIndustries.map(
              (industry) => (
                <span
                  key={industry}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-300"
                >
                  {industry}
                </span>
              )
            )}

          </div>

        </div>

      </div>
    </DashboardShell>
  );
}