import { AppShell } from "@/components/crm/AppShell";

export const metadata = {
  title: "AXDCARE CRM MVP",
  description: "Foreign trade customer development CRM MVP for AXDCARE.",
};

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
