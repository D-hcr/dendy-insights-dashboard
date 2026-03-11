import { SectionCard } from "@/components/ui/section-card";

type AiSummaryCardProps = {
  summary: string;
};

export function AiSummaryCard({ summary }: AiSummaryCardProps) {
  return (
    <SectionCard
      title="AI Insight Summary"
      description="Seçili veri kümesi için otomatik üretilen yönetici özeti"
    >
      <div className="rounded-2xl border border-emerald-400/10 bg-emerald-500/[0.05] p-4">
        <p className="text-sm leading-7 text-slate-200">{summary}</p>
      </div>
    </SectionCard>
  );
}