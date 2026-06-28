import Link from "next/link";
import { TimeCityCard } from "@/components/crm/TimeCityCard";
import { marketCities, getSuggestedAction, getWorkingStatus, getZonedParts } from "@/lib/time";

export default function GlobalTimePage() {
  const grouped = marketCities.reduce<Record<string, string[]>>((acc, city) => {
    const parts = getZonedParts(city.timeZone);
    const status = getWorkingStatus(parts.hour, parts.minute);
    acc[status] = [...(acc[status] ?? []), `${city.country} · ${city.city}`];
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      <section className="border-l-4 border-[#ff6b00] bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500">Reference Office Time</div>
            <h1 className="mt-1 text-2xl font-black">Shenzhen</h1>
            <p className="text-sm text-zinc-500">For international sales call and meeting planning.</p>
          </div>
          <div className="text-5xl font-black">{getZonedParts("Asia/Shanghai").time}</div>
          <div>
            <div className="text-sm font-black">Suggested working window</div>
            <p className="text-sm text-zinc-500">09:00-11:30 · 14:00-17:30</p>
          </div>
        </div>
      </section>

      <section className="border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-black text-black">Global Time Board</h2>
            <p className="text-sm text-zinc-500">16 markets shown · Local time and contact guidance</p>
          </div>
          <Link href="/crm" className="bg-[#111] px-4 py-3 text-sm font-black !text-white hover:bg-[#ff6b00]">Back to Dashboard</Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {marketCities.map((city) => <TimeCityCard key={city.city} city={city} />)}
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {(["Good Time", "Lunch Time", "After Hours", "Not Recommended"] as const).map((status) => (
          <div key={status} className={`border-t-4 bg-white p-5 shadow-sm ${status === "Good Time" ? "border-[#ff6b00]" : "border-[#111]"}`}>
            <h3 className="text-lg font-black">{status}</h3>
            <p className="mt-2 text-sm font-bold text-[#d85b00]">{getSuggestedAction(status)}</p>
            <p className="mt-3 text-sm leading-6 text-zinc-500">{grouped[status]?.join(" / ") || "No markets now"}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
