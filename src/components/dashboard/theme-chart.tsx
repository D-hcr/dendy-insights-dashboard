"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ThemeBreakdown } from "@/types/survey";
import { SectionCard } from "@/components/ui/section-card";

type ThemeChartProps = {
  data: ThemeBreakdown[];
  compact?: boolean;
};

export function ThemeChart({ data, compact = false }: ThemeChartProps) {
  const fixedChartHeight = compact ? 180 : 320;

  const topBottomPadding = compact ? 28 : 40;
  const usableHeight = fixedChartHeight - topBottomPadding;

  const count = Math.max(data.length, 1);
  const gap = compact ? 6 : 10;

  const calculatedBarSize = Math.floor(
    (usableHeight - gap * (count - 1)) / count
  );

  const barSize = compact
    ? Math.max(14, Math.min(calculatedBarSize, 26))
    : Math.max(18, Math.min(calculatedBarSize, 60));

  return (
    <SectionCard
      title="Top Themes"
      description="En sık tekrar eden tema kümeleri"
    >
      {data.length > 0 ? (
        <div className="w-full" style={{ height: `${fixedChartHeight}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                top: compact ? 6 : 12,
                right: 12,
                bottom: compact ? 6 : 12,
                left: 12,
              }}
              barCategoryGap={gap}
            >
              <CartesianGrid
                stroke="rgba(255,255,255,0.08)"
                horizontal={false}
              />
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis
                type="category"
                dataKey="name"
                width={compact ? 90 : 120}
                stroke="#94a3b8"
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                }}
              />
              <Bar
                dataKey="value"
                radius={[0, 12, 12, 0]}
                fill="#38bdf8"
                barSize={barSize}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div
          className="flex items-center justify-center text-sm text-slate-400"
          style={{ height: `${fixedChartHeight}px` }}
        >
          Gösterilecek tema verisi bulunamadı.
        </div>
      )}
    </SectionCard>
  );
}