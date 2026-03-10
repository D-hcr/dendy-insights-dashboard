import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";

export default function InsightsPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Insights"
          title="Insight yaklaşımı"
          description="Bu sayfa modülün ürün mantığını anlatan destekleyici bir alan olarak düşünüldü. Case sunumunda ürün hissini güçlendirmek için kullanılabilir."
        />

        <div className="grid gap-6 md:grid-cols-3">
          <SectionCard title="What matters">
            <p className="text-sm leading-6 text-slate-300">
              Yöneticinin tek tek ham veriye bakmadan genel resmi anlaması gerekir. Bu yüzden bilgi yoğun ama sade bir özet dili kullanıldı.
            </p>
          </SectionCard>
          <SectionCard title="Why this layout">
            <p className="text-sm leading-6 text-slate-300">
              KPI + chart + risk + görünür insight kombinasyonu hem üst seviye okuma hem de operasyonel takibi aynı ekranda mümkün kılar.
            </p>
          </SectionCard>
          <SectionCard title="Next step potential">
            <p className="text-sm leading-6 text-slate-300">
              Dönemsel kıyas, benchmark, aksiyon planı üretimi ve segment bazlı filtreler kolayca eklenebilir.
            </p>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}