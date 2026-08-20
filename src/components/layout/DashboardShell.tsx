import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">

        <Topbar />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}