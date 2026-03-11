"use client";

type AdvancedFiltersProps = {
  sentiment: string;
  onSentimentChange: (value: string) => void;
  riskOnly: boolean;
  onRiskOnlyChange: (value: boolean) => void;
  theme: string;
  onThemeChange: (value: string) => void;
  severityThreshold: number;
  onSeverityThresholdChange: (value: number) => void;
  themeOptions: string[];
};

export function AdvancedFilters({
  sentiment,
  onSentimentChange,
  riskOnly,
  onRiskOnlyChange,
  theme,
  onThemeChange,
  severityThreshold,
  onSeverityThresholdChange,
  themeOptions,
}: AdvancedFiltersProps) {
  return (
    <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 md:grid-cols-2 xl:grid-cols-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Sentiment
        </label>
        <select
          value={sentiment}
          onChange={(e) => onSentimentChange(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-[#0b1328] px-4 py-3 text-sm text-white outline-none"
        >
          <option value="all">All</option>
          <option value="positive">Positive</option>
          <option value="neutral">Neutral</option>
          <option value="negative">Negative</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Theme
        </label>
        <select
          value={theme}
          onChange={(e) => onThemeChange(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-[#0b1328] px-4 py-3 text-sm text-white outline-none"
        >
          <option value="all">All Themes</option>
          {themeOptions.map((themeOption) => (
            <option key={themeOption} value={themeOption}>
              {themeOption}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Severity Threshold: {severityThreshold.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={severityThreshold}
          onChange={(e) => onSeverityThresholdChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex items-end">
        <label className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1328] px-4 py-3 text-sm text-white">
          <input
            type="checkbox"
            checked={riskOnly}
            onChange={(e) => onRiskOnlyChange(e.target.checked)}
            className="h-4 w-4"
          />
          Show only risk items
        </label>
      </div>
    </div>
  );
}