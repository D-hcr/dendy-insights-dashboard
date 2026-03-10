"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { SentimentBreakdown } from "@/types/survey";
import { SectionCard } from "@/components/ui/section-card";

const COLORS = ["#22c55e", "#38bdf8", "#ef4444", "#64748b"];

type SentimentChartProps = {
  data: SentimentBreakdown[];
};

export function SentimentChart({ data }: SentimentChartProps) {
  return (
    <SectionCard
      title="Sentiment Distribution"
      description="Katılımcı yanıtlarının duygu dağılımı"
      className="h-full"
    >
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={65} outerRadius={95} paddingAngle={3}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}