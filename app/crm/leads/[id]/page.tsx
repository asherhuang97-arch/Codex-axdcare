import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail, MessageCircle } from "lucide-react";
import { StatusBadge } from "@/components/crm/StatusBadge";
import { generateEmailDraft, generateWhatsAppMessage } from "@/lib/generators";
import { emailLogs, followUpTasks, leads, whatsAppLogs } from "@/lib/mock-data";
import { scoreLead } from "@/lib/scoring";

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-black text-black">{title}</h2>
      <div className="mt-4 text-sm leading-6 text-zinc-600">{children}</div>
    </section>
  );
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = leads.find((item) => item.id === id);
  if (!lead) notFound();

  const score = scoreLead(lead);
  const email = generateEmailDraft(lead);
  const whatsapp = generateWhatsAppMessage(lead);

  return (
    <div className="space-y-5">
      <section className="border-t-4 border-[#ff6b00] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link href="/crm/leads" className="text-sm font-black text-[#d85b00]">← Back to leads</Link>
            <h1 className="mt-3 text-3xl font-black text-black">{lead.company.name}</h1>
            <p className="mt-1 text-zinc-500">{lead.company.country} · {lead.company.city} · {lead.company.businessType}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <StatusBadge value={lead.status} />
              <StatusBadge value={lead.priority} />
              <span className="bg-zinc-100 px-2 py-1 text-xs font-black text-zinc-700">{score.level}</span>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="bg-zinc-50 p-4">
              <div className="text-xs font-black uppercase text-zinc-500">Lead Score</div>
              <div className="mt-2 text-4xl font-black">{score.total}</div>
            </div>
            <div className="bg-zinc-50 p-4">
              <div className="text-xs font-black uppercase text-zinc-500">Next Follow-up</div>
              <div className="mt-2 text-lg font-black">{new Date(lead.nextFollowUpAt).toLocaleString()}</div>
            </div>
            <div className="bg-zinc-50 p-4">
              <div className="text-xs font-black uppercase text-zinc-500">Matched Product</div>
              <div className="mt-2 text-lg font-black">{lead.matchedAxdProduct}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Company Profile">
          <p>{lead.company.name} is a {lead.company.size.toLowerCase()} {lead.company.businessType.toLowerCase()} in {lead.company.city}, {lead.company.country}.</p>
          <p className="mt-2">Website: {lead.company.website ?? "Not available in customs data"}</p>
        </Panel>
        <Panel title="Contact Information">
          <p>{lead.contact.firstName} {lead.contact.lastName} · {lead.contact.title}</p>
          <p>Email: {lead.contact.email ?? "Missing"}</p>
          <p>Phone: {lead.contact.phone ?? "Missing"}</p>
          <p>WhatsApp: {lead.contact.whatsapp ?? "Missing"}</p>
        </Panel>
        <Panel title="Import History">
          <dl className="grid gap-2 sm:grid-cols-2">
            <div><dt className="font-black text-zinc-900">Product</dt><dd>{lead.importRecord.productDescription}</dd></div>
            <div><dt className="font-black text-zinc-900">HS Code</dt><dd>{lead.importRecord.hsCode}</dd></div>
            <div><dt className="font-black text-zinc-900">Shipment Count</dt><dd>{lead.importRecord.shipmentCount}</dd></div>
            <div><dt className="font-black text-zinc-900">Shipment Value</dt><dd>${lead.importRecord.shipmentValue.toLocaleString()}</dd></div>
          </dl>
        </Panel>
        <Panel title="Product Match">
          <p>Imported product interest: {lead.productInterest}</p>
          <p className="mt-2">Matched AXD product: <strong className="text-black">{lead.matchedAxdProduct}</strong></p>
        </Panel>
        <Panel title="AI Background Summary">
          <p>{lead.aiBackgroundSummary}</p>
        </Panel>
        <Panel title="Recommended Products">
          <ul className="space-y-2">
            {lead.recommendedProducts.map((product) => <li key={product} className="border border-zinc-200 bg-zinc-50 px-3 py-2 font-bold text-zinc-900">{product}</li>)}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Email Draft Generator">
          <div className="flex items-center gap-2 text-[#d85b00]"><Mail size={16} /><strong>Draft only. Sales confirmation required before sending.</strong></div>
          <div className="mt-4 border border-zinc-200 bg-zinc-50 p-4">
            <p className="font-black text-black">Subject: {email.subject}</p>
            <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-zinc-700">{email.body}</pre>
          </div>
        </Panel>
        <Panel title="WhatsApp Message Generator">
          <div className="flex items-center gap-2 text-[#d85b00]"><MessageCircle size={16} /><strong>Short manual outreach script.</strong></div>
          <div className="mt-4 border border-zinc-200 bg-zinc-50 p-4">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-6 text-zinc-700">{whatsapp}</pre>
          </div>
        </Panel>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Panel title="Email History">
          {emailLogs.filter((item) => item.leadId === lead.id).map((log) => <p key={log.id}>{log.sentAt}: {log.subject}</p>)}
          {!emailLogs.some((item) => item.leadId === lead.id) && <p>No email sent yet.</p>}
        </Panel>
        <Panel title="Follow-up Timeline">
          {followUpTasks.filter((item) => item.leadId === lead.id).map((task) => <p key={task.id}>{task.dueAt}: {task.title}</p>)}
        </Panel>
        <Panel title="Sales Notes">
          {lead.notes.map((note) => <p key={note}>• {note}</p>)}
          {whatsAppLogs.filter((item) => item.leadId === lead.id).map((log) => <p key={log.id}>WhatsApp: {log.message}</p>)}
        </Panel>
      </div>
    </div>
  );
}
