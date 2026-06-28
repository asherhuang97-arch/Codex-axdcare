import { FileSpreadsheet, UploadCloud } from "lucide-react";

const fields = [
  "company_name",
  "country",
  "city",
  "importer_name",
  "product_description",
  "hs_code",
  "shipment_count",
  "shipment_value",
  "supplier_country",
  "website",
  "email",
  "phone",
  "whatsapp",
  "source",
];

export default function ImportPage() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black text-black">Lead Import Page</h1>
        <p className="mt-1 text-sm text-zinc-500">Upload CSV or Excel customs data. MVP keeps this as a front-end intake screen for later parser integration.</p>
        <div className="mt-6 flex min-h-72 flex-col items-center justify-center border-2 border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
          <UploadCloud className="text-[#ff6b00]" size={48} />
          <h2 className="mt-4 text-xl font-black">Drop CSV / Excel file here</h2>
          <p className="mt-2 max-w-md text-sm text-zinc-500">First version stores no real file data. Later this area can connect to an upload endpoint, validation job and lead enrichment queue.</p>
          <label className="mt-5 inline-flex cursor-pointer items-center gap-2 bg-[#ff6b00] px-5 py-3 text-sm font-black text-white hover:bg-[#d85b00]">
            <FileSpreadsheet size={17} />
            Select File
            <input type="file" accept=".csv,.xlsx,.xls" className="hidden" />
          </label>
        </div>
      </section>

      <aside className="border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-black">Customs Data Fields</h2>
        <div className="mt-4 grid gap-2">
          {fields.map((field) => (
            <div key={field} className="border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-sm text-zinc-700">{field}</div>
          ))}
        </div>
      </aside>
    </div>
  );
}
