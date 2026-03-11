"use client";

import { Database } from "lucide-react";
import { SectionCard } from "@/components/ui/section-card";

type DatasetStatusProps = {
  fileName: string | null;
  updatedAt: string | null;
  totalRows: number;
  source: "default" | "uploaded";
};

export function DatasetStatus({
  fileName,
  updatedAt,
  totalRows,
  source,
}: DatasetStatusProps) {
  return (
    <SectionCard
      title="Dataset Status"
      description="Dashboard şu anda hangi veri kaynağını kullanıyor?"
    >
      <div className="space-y-3 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-cyan-300" />
          <span>
            Kaynak:{" "}
            <strong className="text-white">
              {source === "uploaded" ? "Uploaded CSV" : "Default CSV"}
            </strong>
          </span>
        </div>

        <p>
          Dosya adı: <span className="text-white">{fileName ?? "data.csv"}</span>
        </p>

        <p>
          Toplam kayıt: <span className="text-white">{totalRows}</span>
        </p>

        <p>
          Son güncelleme:{" "}
          <span className="text-white">
            {updatedAt ? new Date(updatedAt).toLocaleString("tr-TR") : "Varsayılan veri"}
          </span>
        </p>
      </div>
    </SectionCard>
  );
}