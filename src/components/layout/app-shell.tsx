import { ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_26%),radial-gradient(circle_at_left,rgba(16,185,129,0.14),transparent_22%),linear-gradient(180deg,#050816_0%,#0b1020_100%)]" />
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">{children}</main>
    </div>
  );
}