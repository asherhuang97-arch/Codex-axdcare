"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { leads } from "@/lib/mock-data";
import { scoreLead } from "@/lib/scoring";
import { marketCities, getZonedParts } from "@/lib/time";
import { StatusBadge } from "./StatusBadge";

const filters = {
  region: ["All", ...Array.from(new Set(leads.map((lead) => lead.company.region)))],
  country: ["All", ...Array.from(new Set(leads.map((lead) => lead.company.country)))],
  businessType: ["All", ...Array.from(new Set(leads.map((lead) => lead.company.businessType)))],
  product: ["All", ...Array.from(new Set(leads.map((lead) => lead.matchedAxdProduct)))],
  status: ["All", "New Lead", "AI Researched", "Email Drafted", "Email Sent", "Replied", "Quoted", "Sample Requested", "Meeting Scheduled", "Closed Won", "Closed Lost"],
  priority: ["All", "High", "Medium", "Low"],
};

export function LeadTable({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState({ region: "All", country: "All", businessType: "All", product: "All", status: "All", priority: "All" });

  const rows = useMemo(
    () =>
      leads.filter((lead) =>
        (selected.region === "All" || lead.company.region === selected.region) &&
        (selected.country === "All" || lead.company.country === selected.country) &&
        (selected.businessType === "All" || lead.company.businessType === selected.businessType) &&
        (selected.product === "All" || lead.matchedAxdProduct === selected.product) &&
        (selected.status === "All" || lead.status === selected.status) &&
        (selected.priority === "All" || lead.priority === selected.priority)
      ),
    [selected]
  );

  return (
    <section className="border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-black">Customer Follow-up Queue</h2>
          <p className="text-sm text-zinc-500">{rows.length} of {leads.length} leads shown · Sample data only</p>
        </div>
        <Link href="/crm/import" className="text-sm font-black text-[#d85b00]">Import customs data →</Link>
      </div>

      {!compact && (
        <div className="mt-5 grid gap-3 bg-zinc-50 p-3 md:grid-cols-3 lg:grid-cols-6">
          {Object.entries(filters).map(([key, options]) => (
            <label key={key} className="text-[11px] font-black uppercase tracking-wide text-zinc-500">
              {key === "businessType" ? "Business Type" : key === "product" ? "Product Interest" : key}
              <select
                className="mt-2 w-full border border-zinc-300 bg-white px-3 py-2 text-sm font-bold text-zinc-900"
                value={selected[key as keyof typeof selected]}
                onChange={(event) => setSelected((current) => ({ ...current, [key]: event.target.value }))}
              >
                {options.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
          ))}
        </div>
      )}

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[1120px] border-collapse text-left text-sm">
          <thead className="bg-[#111] text-white">
            <tr>
              {["Customer / Company", "Market / Local Time", "Business Type", "Imported Product", "Matched AXD Product", "Lead Score", "Last Contact", "Next Follow-up", "Status", "Priority", "Suggested Action"].map((heading) => (
                <th key={heading} className="px-3 py-3 text-xs font-black uppercase tracking-wide">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((lead) => {
              const score = scoreLead(lead);
              const city = marketCities.find((item) => item.city === lead.company.city);
              const localTime = city ? getZonedParts(city.timeZone).time : "--:--";
              return (
                <tr key={lead.id} className="border-b border-zinc-100 hover:bg-orange-50/40">
                  <td className="px-3 py-4">
                    <Link href={`/crm/leads/${lead.id}`} className="font-black text-zinc-950 hover:text-[#d85b00]">{lead.contact.firstName} {lead.contact.lastName}</Link>
                    <div className="text-xs text-zinc-500">{lead.company.name}</div>
                  </td>
                  <td className="px-3 py-4 font-bold">
                    {lead.company.country} · {lead.company.city}
                    <div className="text-xs font-normal text-zinc-500">{localTime} local</div>
                  </td>
                  <td className="px-3 py-4">{lead.company.businessType}</td>
                  <td className="px-3 py-4">{lead.importRecord.productDescription}</td>
                  <td className="px-3 py-4 font-bold">{lead.matchedAxdProduct}</td>
                  <td className="px-3 py-4">
                    <span className="font-black">{score.total}</span>
                    <div className="text-xs text-zinc-500">{score.level}</div>
                  </td>
                  <td className="px-3 py-4">{lead.lastContactAt ?? "Not contacted"}</td>
                  <td className="px-3 py-4 font-black">{new Date(lead.nextFollowUpAt).toLocaleDateString("en-CA")}</td>
                  <td className="px-3 py-4"><StatusBadge value={lead.status} /></td>
                  <td className="px-3 py-4"><StatusBadge value={lead.priority} /></td>
                  <td className="px-3 py-4 font-black text-[#d85b00]">
                    <Link href={`/crm/leads/${lead.id}`}>Review draft →</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
