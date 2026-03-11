"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/ui/page-header";
import { CsvUpload } from "@/components/dashboard/csv-upload";
import { DatasetStatus } from "@/components/dashboard/dataset-status";
import { getUploadedCsv } from "@/lib/storage";
import { fetchSurveyRows, parseUploadedCsvText } from "@/lib/csv";
import { SurveyRow } from "@/types/survey";

export default function DataImportPage() {
  const [rows, setRows] = useState<SurveyRow[]>([]);
  const [source, setSource] = useState<"default" | "uploaded">("default");
  const [fileName, setFileName] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const refreshData = async () => {
    const uploaded = getUploadedCsv();

    if (uploaded.csvText) {
      const parsed = await parseUploadedCsvText(uploaded.csvText);
      setRows(parsed);
      setSource("uploaded");
      setFileName(uploaded.fileName);
      setUpdatedAt(uploaded.updatedAt);
      return;
    }

    const defaultRows = await fetchSurveyRows();
    setRows(defaultRows);
    setSource("default");
    setFileName("data.csv");
    setUpdatedAt(null);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Data Management"
          title="Veri yükleme ve yönetimi"
          description="Bu alandan sisteme dışarıdan CSV yükleyebilir, dashboard'un kullandığı veri kaynağını değiştirebilir ve varsayılan veriye geri dönebilirsin."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <CsvUpload onUploadSuccess={refreshData} />
          <DatasetStatus
            fileName={fileName}
            updatedAt={updatedAt}
            totalRows={rows.length}
            source={source}
          />
        </div>
      </div>
    </AppShell>
  );
}