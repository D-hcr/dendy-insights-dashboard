"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ThemeBreakdown } from "@/types/survey";
import { SectionCard } from "@/components/ui/section-card";

type ThemeChartProps = {
  data: ThemeBreakdown[];
};

export function ThemeChart({ data }: ThemeChartProps) {
  return (
    <SectionCard title="Top Themes" description="En sık tekrar eden tema kümeleri" className="h-full">
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 12, right: 12 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" horizontal={false} />
            <XAxis type="number" stroke="#94a3b8" />
            <YAxis
              type="category"
              dataKey="name"
              width={110}
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
            <Bar dataKey="value" radius={[0, 12, 12, 0]} fill="#38bdf8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}