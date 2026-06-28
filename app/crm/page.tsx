import Link from "next/link";
import { Mail, MessageCircle, Plus, Upload } from "lucide-react";
import { LeadTable } from "@/components/crm/LeadTable";
import { MetricCard } from "@/components/crm/MetricCard";
import { TimeCityCard } from "@/components/crm/TimeCityCard";
import { leads, meetings } from "@/lib/mock-data";
import { scoreLead } from "@/lib/scoring";
import { marketCities, getWorkingStatus, getZonedParts } from "@/lib/time";

export default function DashboardPage() {
  const hotLeads = leads.filter((lead) => scoreLead(lead).total >= 80);
  const today = new Date().toISOString().slice(0, 10);
  const followUpsToday = leads.filter((lead) => lead.nextFollowUpAt.slice(0, 10) <= today);
  const goodTimeMarkets = marketCities.filter((city) => {
    const parts = getZonedParts(city.timeZone);
    return getWorkingStatus(parts.hour, parts.minute) === "Good Time";
  });
  const emailReady = leads.filter((lead) => ["New Lead", "AI Researched", "Email Drafted"].includes(lead.status));

  return (
    <div className="space-y-5">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        <MetricCard label="Total Leads" value={leads.length} note="All active mock records" />
        <MetricCard label="Hot Leads" value={hotLeads.length} note="A-level opportunities" accent />
        <MetricCard label="Need Follow-up Today" value={followUpsToday.length} note="Manual review queue" accent />
        <MetricCard label="Best Time to Contact Now" value={goodTimeMarkets.length} note="Markets currently open" />
        <MetricCard label="Meetings This Week" value={meetings.length} note="Scheduled conversations" />
        <MetricCard label="Emails Ready to Send" value={emailReady.length} note="Drafts need approval" accent />
        <MetricCard label="AI Researched Leads" value={leads.filter((lead) => lead.status === "AI Researched").length} note="Background completed" />
      </section>

      <section className="flex flex-col gap-4 border border-zinc-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-black text-black">Sales Command Center</h1>
          <p className="text-sm text-zinc-500">Prioritize useful next actions across medical device target markets.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/crm/import" className="inline-flex items-center gap-2 bg-[#ff6b00] px-4 py-3 text-sm font-black text-white hover:bg-[#d85b00]"><Plus size={16} /> Add Mock Lead</Link>
          <button className="inline-flex items-center gap-2 border border-zinc-300 bg-white px-4 py-3 text-sm font-black hover:border-[#111]"><Upload size={16} /> Export CSV</button>
          <Link href={`/crm/leads/${leads[0].id}`} className="inline-flex items-center gap-2 border border-zinc-300 bg-white px-4 py-3 text-sm font-black hover:border-[#111]"><Mail size={16} /> Open Email Template</Link>
          <Link href={`/crm/leads/${leads[0].id}`} className="inline-flex items-center gap-2 border border-zinc-300 bg-white px-4 py-3 text-sm font-black hover:border-[#111]"><MessageCircle size={16} /> Open WhatsApp Draft</Link>
        </div>
      </section>

      <section className="border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-black">Global Market Time</h2>
            <p className="text-sm text-zinc-500">Live local time and recommended contact action.</p>
          </div>
          <span className="text-xs font-black text-emerald-600">● LIVE</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {marketCities.slice(0, 8).map((city) => <TimeCityCard key={city.city} city={city} />)}
        </div>
      </section>

      <LeadTable compact />
    </div>
  );
}
