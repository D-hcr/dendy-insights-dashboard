import {
  KpiStats,
  RawSurveyRow,
  SentimentBreakdown,
  SurveyRow,
  ThemeBreakdown,
} from "@/types/survey";
import { parseBoolean, parseNumber, safeJsonArray } from "@/lib/utils";
import { THEME_LABELS } from "@/lib/constants";

export function normalizeSentiment(
  value: string | undefined | null
): SurveyRow["sentiment"] {
  if (value === "positive" || value === "neutral" || value === "negative") {
    return value;
  }
  return "unknown";
}

export function mapRawRow(row: RawSurveyRow): SurveyRow {
  return {
    labelId: Number(row.label_id),
    tenantId: parseNumber(row.tenant_id),
    surveyParticipationId: parseNumber(row.survey_participation_id),
    participantId: parseNumber(row.participant_id),
    surveyId: String(row.survey_id),
    questionId: parseNumber(row.question_id),
    evaluatedAt: row.evaluated_at ?? "",
    score: parseNumber(row.score),
    sentiment: normalizeSentiment(row.sentiment),
    riskFlag: parseBoolean(row.risk_flag),
    tags: safeJsonArray(row.tags),
    summary: row.summary ?? "",
    checkedAt: row.checked_at ?? "",
    createdAt: row.created_at ?? "",
    updatedAt: row.updated_at ?? "",
    shouldDisplay: parseBoolean(row.should_display),
    displayLabel: row.display_label ?? "",
    displayNote: row.display_note ?? "",
    severity: parseNumber(row.severity) ?? 0,
    confidence: parseNumber(row.confidence) ?? 0,
    themes: safeJsonArray(row.themes),
    riskFlags: safeJsonArray(row.risk_flags),
    action: row.action ?? "",
    labelPayload: row.label_payload ?? "",
    labelVersion: row.label_version ?? "",
    promptVersion: row.prompt_version ?? "",
    labelModel: row.label_model ?? "",
    inputFingerprint: row.input_fingerprint ?? "",
    labeledAt: row.labeled_at ?? "",
  };
}

export function buildKpis(rows: SurveyRow[]): KpiStats {
  const scoreRows = rows.filter((row) => row.score !== null);

  const totalScore = scoreRows.reduce((acc, row) => acc + (row.score ?? 0), 0);
  const totalConfidence = rows.reduce((acc, row) => acc + row.confidence, 0);
  const totalSeverity = rows.reduce((acc, row) => acc + row.severity, 0);

  return {
    totalResponses: rows.length,
    displayedInsights: rows.filter((row) => row.shouldDisplay).length,
    averageScore: scoreRows.length ? totalScore / scoreRows.length : 0,
    riskCount: rows.filter((row) => row.riskFlag).length,
    averageConfidence: rows.length ? totalConfidence / rows.length : 0,
    averageSeverity: rows.length ? totalSeverity / rows.length : 0,
  };
}

export function buildSentimentBreakdown(
  rows: SurveyRow[]
): SentimentBreakdown[] {
  const counts = rows.reduce(
    (acc, row) => {
      acc[row.sentiment] = (acc[row.sentiment] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return [
    { name: "Positive", value: counts.positive ?? 0 },
    { name: "Neutral", value: counts.neutral ?? 0 },
    { name: "Negative", value: counts.negative ?? 0 },
    { name: "Unknown", value: counts.unknown ?? 0 },
  ];
}

export function buildThemeBreakdown(rows: SurveyRow[]): ThemeBreakdown[] {
  const counter = new Map<string, number>();

  rows.forEach((row) => {
    row.themes.forEach((theme) => {
      const label = THEME_LABELS[theme] ?? theme.replaceAll("_", " ");
      counter.set(label, (counter.get(label) ?? 0) + 1);
    });
  });

  return [...counter.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
}

export function getSurveyOptions(rows: SurveyRow[]) {
  const unique = [...new Set(rows.map((row) => row.surveyId))];
  return unique.sort((a, b) => Number(a) - Number(b));
}

export function getHighlightedInsights(rows: SurveyRow[]) {
  return rows
    .filter((row) => row.shouldDisplay)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 8);
}

export function getRiskRows(rows: SurveyRow[]) {
  return rows
    .filter(
      (row) => row.riskFlag || row.severity >= 0.5 || row.sentiment === "negative"
    )
    .sort((a, b) => b.severity - a.severity)
    .slice(0, 6);
}