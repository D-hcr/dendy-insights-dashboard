"use client";

import { SurveyRow } from "@/types/survey";
import {
  buildKpis,
  buildSentimentBreakdown,
  buildThemeBreakdown,
} from "@/lib/transformers";
import { formatDecimal } from "@/lib/utils";
import { SentimentChart } from "./sentiment-chart";
import { ThemeChart } from "./theme-chart";

type Props = {
  surveyA: string;
  surveyB: string;
  rows: SurveyRow[];
  options: string[];
  onSurveyBChange: (value: string) => void;
};

export function SurveyComparison({
  surveyA,
  surveyB,
  rows,
  options,
  onSurveyBChange,
}: Props) {
  const rowsA = rows.filter((row) => row.surveyId === surveyA);
  const rowsB = rows.filter((row) => row.surveyId === surveyB);

  const kpiA = buildKpis(rowsA);
  const kpiB = buildKpis(rowsB);

  const sentimentA = buildSentimentBreakdown(rowsA);
  const sentimentB = buildSentimentBreakdown(rowsB);

  const themeA = buildThemeBreakdown(rowsA);
  const themeB = buildThemeBreakdown(rowsB);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Survey Comparison</h2>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Sol Panel — Survey {surveyA}
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-xs text-slate-400">Responses</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {kpiA.totalResponses}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-xs text-slate-400">Avg Score</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {formatDecimal(kpiA.averageScore, 1)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-xs text-slate-400">Risk</p>
              <p className="mt-1 text-lg font-semibold text-red-300">
                {kpiA.riskCount}
              </p>
            </div>
          </div>

          <SentimentChart data={sentimentA} compact />
          <ThemeChart data={themeA} compact />
        </div>

        <div className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-white">
              Sağ Panel — Survey {surveyB}
            </h3>

            <select
              value={surveyB}
              onChange={(e) => onSurveyBChange(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#0b1328] px-3 py-2 text-sm text-white outline-none"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  Survey {option}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-xs text-slate-400">Responses</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {kpiB.totalResponses}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-xs text-slate-400">Avg Score</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {formatDecimal(kpiB.averageScore, 1)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-xs text-slate-400">Risk</p>
              <p className="mt-1 text-lg font-semibold text-red-300">
                {kpiB.riskCount}
              </p>
            </div>
          </div>

          <SentimentChart data={sentimentB} compact />
          <ThemeChart data={themeB} compact />
        </div>
      </div>
    </div>
  );
}