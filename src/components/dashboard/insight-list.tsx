import { SurveyRow } from "@/types/survey";
import { SectionCard } from "@/components/ui/section-card";

type InsightListProps = {
  rows: SurveyRow[];
};

function badgeClass(sentiment: SurveyRow["sentiment"]) {
  if (sentiment === "positive") return "bg-emerald-500/15 text-emerald-300 border-emerald-400/20";
  if (sentiment === "negative") return "bg-red-500/15 text-red-300 border-red-400/20";
  if (sentiment === "neutral") return "bg-sky-500/15 text-sky-300 border-sky-400/20";
  return "bg-slate-500/15 text-slate-300 border-slate-400/20";
}

export function InsightList({ rows }: InsightListProps) {
  return (
    <SectionCard
      title="Highlighted Insights"
      description="Yöneticinin ilk bakışta görmesi gereken görünür içgörüler"
      className="h-full"
    >
      <div className="space-y-4">
        {rows.map((row) => (
          <article key={row.labelId} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full border px-3 py-1 text-xs font-medium ${badgeClass(row.sentiment)}`}>
                {row.sentiment}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                Confidence {row.confidence.toFixed(2)}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                Severity {row.severity.toFixed(2)}
              </span>
            </div>

            <h4 className="mt-4 text-base font-semibold text-white">
              {row.displayLabel || row.summary || "Insight"}
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              {row.displayNote || row.summary || "Ek açıklama bulunamadı."}
            </p>

            {row.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {row.tags.map((tag) => (
                  <span
                    key={`${row.labelId}-${tag}`}
                    className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}

        {rows.length === 0 && <p className="text-sm text-slate-400">Gösterilecek insight bulunamadı.</p>}
      </div>
    </SectionCard>
  );
}