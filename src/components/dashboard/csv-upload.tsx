"use client";

import { useState } from "react";
import { Upload, RotateCcw, FileText } from "lucide-react";
import { SectionCard } from "@/components/ui/section-card";
import { readFileAsText, parseUploadedCsvText } from "@/lib/csv";
import { clearUploadedCsv, saveUploadedCsv } from "@/lib/storage";

type CsvUploadProps = {
  onUploadSuccess: () => void;
};

export function CsvUpload({ onUploadSuccess }: CsvUploadProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const text = await readFileAsText(file);

      const parsed = await parseUploadedCsvText(text);

      if (!parsed.length) {
        throw new Error("CSV içinde geçerli veri bulunamadı.");
      }

      saveUploadedCsv(text, file.name);
      setMessage(`${file.name} başarıyla yüklendi. Toplam ${parsed.length} kayıt bulundu.`);
      onUploadSuccess();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "CSV yüklenirken bir hata oluştu.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    clearUploadedCsv();
    setMessage("Yüklenen veri temizlendi. Varsayılan CSV kullanılacak.");
    setError("");
    onUploadSuccess();
  };

  return (
    <SectionCard
      title="CSV Import"
      description="Sisteme dışarıdan CSV yükleyerek dashboard verisini güncelle"
    >
      <div className="space-y-4">
        <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-cyan-400/30 bg-cyan-400/[0.05] px-4 py-8 text-sm text-slate-300 transition hover:border-cyan-300/50 hover:bg-cyan-400/[0.08]">
          <Upload className="h-5 w-5 text-cyan-300" />
          <span>{loading ? "Dosya yükleniyor..." : "CSV dosyası seç"}</span>
          <input
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
          />
        </label>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
          >
            <RotateCcw className="h-4 w-4" />
            Varsayılan veriye dön
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-emerald-300" />
            Beklenen format: mevcut `data.csv` ile aynı kolon yapısı
          </div>
        </div>

        {message && (
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {message}
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}
      </div>
    </SectionCard>
  );
}