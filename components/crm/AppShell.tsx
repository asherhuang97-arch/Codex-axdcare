import Link from "next/link";
import { Clock, LayoutDashboard, Upload, Users } from "lucide-react";
import { ShenzhenClock } from "./ShenzhenClock";

const navItems = [
  { href: "/crm", label: "Dashboard", icon: LayoutDashboard },
  { href: "/crm/time", label: "Global Time", icon: Clock },
  { href: "/crm/leads", label: "Leads", icon: Users },
  { href: "/crm/import", label: "Import", icon: Upload },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f2f3f5]">
      <header className="border-b-4 border-[#ff6b00] bg-[#111] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link href="/crm" className="text-2xl font-black tracking-tight">
              AXDCARE Sales Follow-up CRM
            </Link>
            <p className="mt-1 text-sm text-zinc-400">Customer development CRM with AI-assisted draft workflows</p>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <nav className="flex flex-wrap gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-2 border border-zinc-700 px-3 py-2 text-xs font-bold uppercase tracking-wide text-zinc-100 hover:border-[#ff6b00] hover:text-[#ff6b00]"
                  >
                    <Icon size={15} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <ShenzhenClock />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6">{children}</main>
    </div>
  );
}
