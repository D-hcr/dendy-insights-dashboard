"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Eye,
  Gauge,
  MessageSquare,
} from "lucide-react";

import { fetchSurveyRows, parseUploadedCsvText } from "@/lib/csv";
import { getUploadedCsv } from "@/lib/storage";
import {
  buildAiSummary,
  buildKpis,
  buildSentimentBreakdown,
  buildThemeBreakdown,
  getHighlightedInsights,
  getRiskRows,
  getSurveyOptions,
  getThemeOptions,
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
import { AdvancedFilters } from "@/components/dashboard/advanced-filters";
import { AiSummaryCard } from "@/components/dashboard/ai-summary-card";
import { SurveyComparison } from "@/components/dashboard/survey-comparison";

export function DashboardClient() {
  const [rows, setRows] = useState<SurveyRow[]>([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState("");
  const [comparisonSurveyId, setComparisonSurveyId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sentimentFilter, setSentimentFilter] = useState("all");
  const [riskOnly, setRiskOnly] = useState(false);
  const [themeFilter, setThemeFilter] = useState("all");
  const [severityThreshold, setSeverityThreshold] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const uploaded = getUploadedCsv();

        let data: SurveyRow[] = [];

        if (uploaded.csvText) {
          data = await parseUploadedCsvText(uploaded.csvText);
        } else {
          data = await fetchSurveyRows();
        }

        setRows(data);

        const surveyOptions = getSurveyOptions(data);

        if (surveyOptions.length > 0) {
          setSelectedSurveyId(surveyOptions[0]);
          setComparisonSurveyId(surveyOptions[1] ?? surveyOptions[0]);
        } else {
          setSelectedSurveyId("");
          setComparisonSurveyId("");
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
  const themeOptions = useMemo(() => getThemeOptions(rows), [rows]);

  const filteredRows = useMemo(() => {
    return rows
      .filter((row) => row.surveyId === selectedSurveyId)
      .filter(
        (row) => sentimentFilter === "all" || row.sentiment === sentimentFilter
      )
      .filter((row) => !riskOnly || row.riskFlag)
      .filter((row) => themeFilter === "all" || row.themes.includes(themeFilter))
      .filter((row) => row.severity >= severityThreshold);
  }, [
    rows,
    selectedSurveyId,
    sentimentFilter,
    riskOnly,
    themeFilter,
    severityThreshold,
  ]);

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
  const aiSummary = useMemo(() => buildAiSummary(filteredRows), [filteredRows]);

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
        description="Bu ekran, CSV üzerinden gelen survey yanıtlarını analiz ederek duygu dağılımı, kritik riskler, görünür insight'lar ve öne çıkan temaları tek bakışta gösterir."
        action={
          <SurveySelect
            options={surveyOptions}
            value={selectedSurveyId}
            onChange={setSelectedSurveyId}
          />
        }
      />

      <AdvancedFilters
        sentiment={sentimentFilter}
        onSentimentChange={setSentimentFilter}
        riskOnly={riskOnly}
        onRiskOnlyChange={setRiskOnly}
        theme={themeFilter}
        onThemeChange={setThemeFilter}
        severityThreshold={severityThreshold}
        onSeverityThresholdChange={setSeverityThreshold}
        themeOptions={themeOptions}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total Responses"
          value={String(kpis.totalResponses)}
          hint="Seçili filtrelerde toplam kayıt"
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

      <div className="grid items-start gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6">
          <div className="grid items-start gap-6 lg:grid-cols-2">
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
                <p className="mt-2 break-all text-xl font-semibold text-white">
                  {selectedSurveyId || "-"}
                </p>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="grid gap-6">
          <RiskPanel rows={riskRows} />
          <InsightList rows={insights} />
        </div>
      </div>

      <AiSummaryCard summary={aiSummary} />

      <SurveyComparison
        surveyA={selectedSurveyId}
        surveyB={comparisonSurveyId}
        rows={rows}
        options={surveyOptions}
        onSurveyBChange={setComparisonSurveyId}
      />
    </div>
  );
}