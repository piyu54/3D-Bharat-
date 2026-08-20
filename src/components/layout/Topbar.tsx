"use client";

export default function Topbar() {
  return (
    <header className="h-20 shrink-0 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl flex items-center justify-between px-6 lg:px-8">

      <div className="flex items-center gap-3">

        <button
          className="lg:hidden rounded-lg border border-slate-800 px-3 py-2 text-slate-400"
          aria-label="Open navigation"
        >
          ☰
        </button>

        <div className="hidden sm:block">
          <p className="text-xs text-slate-500">
            Investor Workspace
          </p>

          <p className="text-sm font-medium text-white">
            Portfolio Overview
          </p>
        </div>

      </div>

      <div className="flex items-center gap-3">

        <button
          className="hidden md:flex items-center gap-2 w-64 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-500"
        >
          <span>⌕</span>
          <span>Search deals...</span>
          <span className="ml-auto text-xs text-slate-600">
            /
          </span>
        </button>

        <button
          className="relative h-10 w-10 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition"
          aria-label="Notifications"
        >
          ♢
        </button>

        <div className="flex items-center gap-3 pl-2">

          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-white">
              Priya
            </p>

            <p className="text-xs text-slate-500">
              Investor
            </p>
          </div>

          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-sm font-bold text-slate-950">
            P
          </div>

        </div>

      </div>

    </header>
  );
}