"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { SentimentBreakdown } from "@/types/survey";
import { SectionCard } from "@/components/ui/section-card";

const COLORS = ["#22c55e", "#38bdf8", "#ef4444", "#64748b"];

type SentimentChartProps = {
  data: SentimentBreakdown[];
  compact?: boolean;
};

export function SentimentChart({
  data,
  compact = false,
}: SentimentChartProps) {
  const chartHeight = compact ? 180 : 300;
  const innerRadius = compact ? 38 : 65;
  const outerRadius = compact ? 58 : 95;

  return (
    <SectionCard
      title="Sentiment Distribution"
      description="Katılımcı yanıtlarının duygu dağılımı"
    >
      <div className="w-full" style={{ height: `${chartHeight}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={3}
            >
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