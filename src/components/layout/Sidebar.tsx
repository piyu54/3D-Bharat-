"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    label: "Overview",
    href: "/",
    icon: "⌂",
  },
  {
    label: "Deal Explorer",
    href: "/deals",
    icon: "◈",
  },
  {
    label: "My Investments",
    href: "/investments",
    icon: "▣",
  },
  {
    label: "Interests",
    href: "/interests",
    icon: "♡",
  },
  {
    label: "Corporate",
    href: "/corporate",
    icon: "▤",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950">

      <div className="h-20 flex items-center px-6 border-b border-slate-800">
        <div>
          <div className="text-xl font-bold tracking-tight text-white">
            3D <span className="text-cyan-400">BHARAT</span>
          </div>

          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-1">
            Investor Intelligence
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">

        <p className="px-3 mb-3 text-[11px] font-medium uppercase tracking-wider text-slate-500">
          Workspace
        </p>

        {navigation.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-all ${
                active
                  ? "bg-cyan-400/10 text-cyan-300 border border-cyan-400/10"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <span className="w-5 text-center">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </Link>
          );
        })}

      </nav>

      <div className="p-3 border-t border-slate-800">

        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-400 hover:bg-slate-900 hover:text-white transition"
        >
          <span className="w-5 text-center">⚙</span>
          Settings
        </Link>

      </div>

    </aside>
  );
}