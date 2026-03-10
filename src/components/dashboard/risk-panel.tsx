import { AlertTriangle } from "lucide-react";
import { SurveyRow } from "@/types/survey";
import { SectionCard } from "@/components/ui/section-card";

type RiskPanelProps = {
  rows: SurveyRow[];
};

export function RiskPanel({ rows }: RiskPanelProps) {
  return (
    <SectionCard
      title="Risk Watch"
      description="Negatif sentiment, yüksek severity veya risk flag taşıyan kayıtlar"
      className="h-full"
    >
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.labelId} className="rounded-2xl border border-red-400/10 bg-red-500/[0.04] p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-xl bg-red-500/10 p-2 text-red-300">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">
                  {row.displayLabel || row.summary || "Risk insight"}
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  {row.displayNote || row.summary || "Açıklama bulunamadı."}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Severity {row.severity.toFixed(2)}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Confidence {row.confidence.toFixed(2)}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Action {row.action || "watch"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {rows.length === 0 && <p className="text-sm text-slate-400">Öne çıkan risk kaydı bulunamadı.</p>}
      </div>
    </SectionCard>
  );
}