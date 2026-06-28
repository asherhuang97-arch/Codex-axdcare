"use client";

import { useEffect, useState } from "react";
import { getSuggestedAction, getWorkingStatus, getZonedParts, type MarketCity, type WorkingStatus } from "@/lib/time";

function tone(status: WorkingStatus) {
  if (status === "Good Time") return "bg-emerald-50 text-emerald-700";
  if (status === "Lunch Time") return "bg-amber-50 text-amber-700";
  if (status === "After Hours") return "bg-zinc-100 text-zinc-600";
  return "bg-red-50 text-red-700";
}

export function TimeCityCard({ city }: { city: MarketCity }) {
  const [parts, setParts] = useState(() => getZonedParts(city.timeZone));

  useEffect(() => {
    const timer = window.setInterval(() => setParts(getZonedParts(city.timeZone)), 30000);
    return () => window.clearInterval(timer);
  }, [city.timeZone]);

  const status = getWorkingStatus(parts.hour, parts.minute);

  return (
    <article className="min-h-44 border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-black text-black">{city.city}</h3>
          <p className="text-xs text-zinc-500">{city.country}</p>
        </div>
        <span className={`px-2 py-1 text-[11px] font-black ${tone(status)}`}>{status}</span>
      </div>
      <div className="mt-7 text-4xl font-black leading-none text-black">{parts.time}</div>
      <p className="mt-2 text-xs text-zinc-500">
        {parts.date}
        <br />
        {city.timeZone}
      </p>
      <div className="mt-4 border-t border-zinc-100 pt-3 text-sm font-bold text-zinc-900">→ {getSuggestedAction(status)}</div>
    </article>
  );
}
