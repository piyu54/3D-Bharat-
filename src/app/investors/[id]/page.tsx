"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import DashboardShell from "@/components/layout/DashboardShell";
import { getInvestorById } from "@/services/investorService";
import type { Investor } from "@/types/investor";

export default function InvestorDetailsPage() {
  const params = useParams();

  const investorId = params.id as string;

  const [investor, setInvestor] =
    useState<Investor | null>(null);

  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  useEffect(() => {
    const loadInvestor = async () => {
      try {
        setStatus("loading");

        const data =
          await getInvestorById(investorId);

        if (!data) {
          setInvestor(null);
          setStatus("error");
          return;
        }

        setInvestor(data);
        setStatus("success");
      } catch (error) {
        console.error(
          "Failed to load investor:",
          error
        );

        setStatus("error");
      }
    };

    loadInvestor();
  }, [investorId]);

  return (
    <DashboardShell>
      <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">

        {/* Back */}
        <Link
          href="/investors"
          className="inline-flex items-center text-sm text-slate-400 hover:text-cyan-400 transition mb-6"
        >
          ← Back to Investor Explorer
        </Link>

        {/* Loading */}
        {status === "loading" && (
          <div className="space-y-4">

            <div className="h-32 rounded-xl border border-slate-800 bg-slate-900 animate-pulse" />

            <div className="h-64 rounded-xl border border-slate-800 bg-slate-900 animate-pulse" />

          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-8 text-center">

            <h1 className="text-lg font-medium text-white">
              Investor not found
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              We couldn't find the investor you're
              looking for.
            </p>

            <Link
              href="/investors"
              className="inline-block mt-5 text-sm text-cyan-400 hover:text-cyan-300"
            >
              Return to investors
            </Link>

          </div>
        )}

        {/* Details */}
        {status === "success" && investor && (
          <div className="space-y-4">

            {/* Profile Header */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">

                <div>

                  <p className="text-sm text-cyan-400 mb-2">
                    Investor Profile
                  </p>

                  <h1 className="text-3xl font-semibold tracking-tight">
                    {investor.name}
                  </h1>

                  <p className="text-slate-400 mt-2">
                    {investor.company}
                  </p>

                  <p className="text-sm text-slate-500 mt-2">
                    {investor.location}
                  </p>

                </div>

                <span className="self-start rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
                  {investor.type}
                </span>

              </div>

            </div>

            {/* Investment Overview */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="font-semibold">
                Investment Overview
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Capital capacity and preferred ticket range
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

                <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">

                  <p className="text-xs text-slate-500">
                    Investment Capacity
                  </p>

                  <p className="text-xl font-semibold text-white mt-2">
                    ₹{investor.investmentCapacity}L
                  </p>

                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">

                  <p className="text-xs text-slate-500">
                    Minimum Ticket
                  </p>

                  <p className="text-xl font-semibold text-white mt-2">
                    ₹{investor.minimumTicket}L
                  </p>

                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">

                  <p className="text-xs text-slate-500">
                    Maximum Ticket
                  </p>

                  <p className="text-xl font-semibold text-white mt-2">
                    ₹{investor.maximumTicket}L
                  </p>

                </div>

              </div>

            </div>

            {/* Risk & Industries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {/* Risk */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                <h2 className="font-semibold">
                  Risk Preference
                </h2>

                <div className="mt-5">

                  <span
                    className={`inline-flex rounded-full px-4 py-2 text-sm ${
                      investor.riskPreference === "High"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : investor.riskPreference ===
                          "Medium"
                        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    }`}
                  >
                    {investor.riskPreference} Risk
                  </span>

                </div>

              </div>

              {/* Industries */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                <h2 className="font-semibold">
                  Preferred Industries
                </h2>

                <div className="flex flex-wrap gap-2 mt-5">

                  {investor.preferredIndustries.map(
                    (industry) => (
                      <span
                        key={industry}
                        className="rounded-md border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-400"
                      >
                        {industry}
                      </span>
                    )
                  )}

                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </DashboardShell>
  );
}