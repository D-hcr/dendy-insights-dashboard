import { ReactNode } from "react";
import { SectionCard } from "@/components/ui/section-card";

type KpiCardProps = {
  label: string;
  value: string;
  hint: string;
  icon: ReactNode;
};

export function KpiCard({ label, value, hint, icon }: KpiCardProps) {
  return (
    <SectionCard className="h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</p>
          <p className="mt-2 text-sm text-slate-400">{hint}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-cyan-300">
          {icon}
        </div>
      </div>
    </SectionCard>
  );
}