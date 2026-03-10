"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Eye,
  Gauge,
  MessageSquare,
} from "lucide-react";

import { fetchSurveyRows } from "@/lib/csv";
import {
  buildKpis,
  buildSentimentBreakdown,
  buildThemeBreakdown,
  getHighlightedInsights,
  getRiskRows,
  getSurveyOptions,
} from "@/lib/transformers";
import { formatDecimal, formatPercent } from "@/lib/utils";
import { SurveyRow } from "@/types/survey";

import { PageHeader } from "@/components/ui/page-header";
import { SurveySelect } from "@/components/dashboard/survey-select";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { SentimentChart } from "@/components/dashboard/sentiment-chart";
import { ThemeChart } from "@/components/dashboard/theme-chart";
import { InsightList } from "@/components/dashboard/insight-list";
import { RiskPanel } from "@/components/dashboard/risk-panel";
import { SectionCard } from "@/components/ui/section-card";

export function DashboardClient() {
  const [rows, setRows] = useState<SurveyRow[]>([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const data = await fetchSurveyRows();
        setRows(data);

        const surveyOptions = getSurveyOptions(data);
        if (surveyOptions.length > 0) {
          setSelectedSurveyId(surveyOptions[0]);
        }
      } catch (err) {
        console.error(err);
        setError("CSV verisi okunurken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const surveyOptions = useMemo(() => getSurveyOptions(rows), [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => row.surveyId === selectedSurveyId);
  }, [rows, selectedSurveyId]);

  const kpis = useMemo(() => buildKpis(filteredRows), [filteredRows]);
  const sentimentData = useMemo(
    () => buildSentimentBreakdown(filteredRows),
    [filteredRows]
  );
  const themeData = useMemo(
    () => buildThemeBreakdown(filteredRows),
    [filteredRows]
  );
  const insights = useMemo(
    () => getHighlightedInsights(filteredRows),
    [filteredRows]
  );
  const riskRows = useMemo(() => getRiskRows(filteredRows), [filteredRows]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-slate-300">
          Veri yükleniyor...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-6 py-4 text-sm text-red-200">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Executive Insight Module"
        title="Ne Dendy? — survey verisini yönetsel içgörüye dönüştür"
        description="Bu ekran, CSV üzerinden gelen survey yanıtlarını analiz ederek duygu dağılımı, kritik riskler, görünür insight'lar ve öne çıkan temaları tek bakışta gösterir. Amaç, yöneticinin aksiyon alabileceği özet bir karar alanı sunmaktır."
        action={
          <SurveySelect
            options={surveyOptions}
            value={selectedSurveyId}
            onChange={setSelectedSurveyId}
          />
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total Responses"
          value={String(kpis.totalResponses)}
          hint="Seçili survey içindeki toplam kayıt"
          icon={<MessageSquare className="h-5 w-5" />}
        />
        <KpiCard
          label="Visible Insights"
          value={String(kpis.displayedInsights)}
          hint="Arayüzde gösterilmeye uygun insight sayısı"
          icon={<Eye className="h-5 w-5" />}
        />
        <KpiCard
          label="Average Score"
          value={formatDecimal(kpis.averageScore, 1)}
          hint="Puan alan yanıtların ortalaması"
          icon={<Gauge className="h-5 w-5" />}
        />
        <KpiCard
          label="Risk Count"
          value={String(kpis.riskCount)}
          hint="Risk flag taşıyan kayıtlar"
          icon={<AlertTriangle className="h-5 w-5" />}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <SentimentChart data={sentimentData} />
            <ThemeChart data={themeData} />
          </div>

          <SectionCard
            title="Insight Summary"
            description="Seçili survey için kısa operasyonel özet"
          >
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">Avg. Confidence</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {formatPercent(kpis.averageConfidence * 100, 0)}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">Avg. Severity</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {formatDecimal(kpis.averageSeverity, 2)}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">Survey ID</p>
                <p className="mt-2 text-xl font-semibold break-all text-white">
                  {selectedSurveyId}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.05] p-4 text-sm leading-6 text-slate-300">
              Öneri: Bu alana ileride server-side aggregation, benchmark
              kıyasları, önceki dönem karşılaştırması ve aksiyon önerileri de
              eklenebilir. Mevcut haliyle veri setinden doğrudan gelen
              içgörüleri okunabilir ve yönetici dostu bir sunumla gösteriyoruz.
            </div>
          </SectionCard>
        </div>

        <div className="grid gap-6">
          <RiskPanel rows={riskRows} />
          <InsightList rows={insights} />
        </div>
      </div>

      <SectionCard
        title="Implementation Notes"
        description="Case değerlendirmesinde anlatabileceğin kısa teknik notlar"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">CSV Parsing</p>
            <p className="mt-2">
              Veri uygulama içinde <code>/public/data/data.csv</code> üzerinden
              okunur ve Papa Parse ile parse edilir.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">Component Architecture</p>
            <p className="mt-2">
              Navbar, shell, KPI kartları, chart ve insight blokları ayrı
              component'lere bölünmüştür.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">Scalable UI</p>
            <p className="mt-2">
              Yapı yeni survey metrikleri, benchmark sayfaları ve drill-down
              ekranları eklemeye uygundur.
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}