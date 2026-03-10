import { AppShell } from "@/components/layout/app-shell";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export default function HomePage() {
  return (
    <AppShell>
      <DashboardClient />
    </AppShell>
  );
}