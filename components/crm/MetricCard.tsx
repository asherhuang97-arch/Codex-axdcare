export function MetricCard({ label, value, note, accent = false }: { label: string; value: string | number; note: string; accent?: boolean }) {
  return (
    <div className={`border-t-4 bg-white p-5 shadow-sm ${accent ? "border-[#ff6b00]" : "border-[#111]"}`}>
      <div className="text-xs font-black uppercase tracking-wide text-zinc-600">{label}</div>
      <div className="mt-3 text-4xl font-black leading-none text-black">{value}</div>
      <div className="mt-3 text-sm text-zinc-500">{note}</div>
    </div>
  );
}
