import type { LeadStatus, Priority } from "@/lib/types";

export function StatusBadge({ value }: { value: LeadStatus | Priority | string }) {
  const tone =
    value === "High" || value === "AI Researched" || value === "Sample Requested"
      ? "bg-red-50 text-red-700"
      : value === "Medium" || value === "Email Drafted" || value === "Quoted"
        ? "bg-amber-50 text-amber-700"
        : value === "Low" || value === "Closed Lost"
          ? "bg-zinc-100 text-zinc-600"
          : value === "Meeting Scheduled" || value === "Closed Won" || value === "Replied"
            ? "bg-emerald-50 text-emerald-700"
            : "bg-orange-50 text-orange-700";

  return <span className={`inline-flex whitespace-nowrap px-2 py-1 text-xs font-black ${tone}`}>{value}</span>;
}
