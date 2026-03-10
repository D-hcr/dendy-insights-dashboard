"use client";

type SurveySelectProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export function SurveySelect({ options, value, onChange }: SurveySelectProps) {
  return (
    <div className="w-full min-w-[250px] max-w-sm">
      <label className="mb-2 block text-sm font-medium text-slate-300">Survey seçimi</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-[#0b1328] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40"
      >
        {options.map((surveyId) => (
          <option key={surveyId} value={surveyId}>
            Survey #{surveyId}
          </option>
        ))}
      </select>
    </div>
  );
}