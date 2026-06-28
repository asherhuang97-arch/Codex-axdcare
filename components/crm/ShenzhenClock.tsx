"use client";

import { useEffect, useState } from "react";
import { getZonedParts } from "@/lib/time";

export function ShenzhenClock() {
  const [now, setNow] = useState(() => getZonedParts("Asia/Shanghai"));

  useEffect(() => {
    const timer = window.setInterval(() => setNow(getZonedParts("Asia/Shanghai")), 30000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="border-l border-zinc-700 pl-5 text-right">
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">Shenzhen Time</div>
      <div className="text-3xl font-black leading-none">{now.time}</div>
      <div className="mt-1 text-[11px] font-bold uppercase tracking-wide text-zinc-500">{now.date} · Updated {now.time}</div>
    </div>
  );
}
