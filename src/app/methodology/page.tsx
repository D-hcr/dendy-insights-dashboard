import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";

export default function MethodologyPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Methodology"
          title="Teknik yaklaşım"
          description="Veri okuma, normalize etme, filtreleme ve sunum katmanları ayrı tutuldu. Böylece yapı hem okunabilir hem genişletilebilir hale geldi."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Data flow">
            <ol className="space-y-3 text-sm leading-6 text-slate-300">
              <li>1. CSV dosyası public klasöründen fetch edilir.</li>
              <li>2. Papa Parse ile satırlar parse edilir.</li>
              <li>3. Raw veri typed yapıya normalize edilir.</li>
              <li>4. `survey_id` bazlı filtreleme yapılır.</li>
              <li>5. KPI, sentiment ve tema kırılımları derive edilir.</li>
            </ol>
          </SectionCard>

          <SectionCard title="Neden Next.js?">
            <ul className="space-y-3 text-sm leading-6 text-slate-300">
              <li>App Router ile düzenli sayfa mimarisi</li>
              <li>TypeScript ile daha güvenli veri dönüşümü</li>
              <li>Component bazlı yapı kurmak kolay</li>
              <li>Tailwind ile hızlı ama düzenli UI geliştirme</li>
            </ul>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}