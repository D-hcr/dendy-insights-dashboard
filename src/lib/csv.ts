import Papa from "papaparse";
import { RawSurveyRow, SurveyRow } from "@/types/survey";
import { mapRawRow } from "@/lib/transformers";

const REQUIRED_COLUMNS = [
  "label_id",
  "tenant_id",
  "survey_participation_id",
  "participant_id",
  "survey_id",
  "question_id",
  "evaluated_at",
];

function validateCsvColumns(rows: RawSurveyRow[]) {
  if (!rows.length) {
    throw new Error("CSV içinde veri bulunamadı.");
  }

  const firstRow = rows[0] as Record<string, unknown>;

  const missing = REQUIRED_COLUMNS.filter((column) => !(column in firstRow));

  if (missing.length > 0) {
    throw new Error(`Eksik kolonlar: ${missing.join(", ")}`);
  }
}

function parseCsvText(csvText: string): Promise<SurveyRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<RawSurveyRow>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          validateCsvColumns(results.data);
          const normalized = results.data.map(mapRawRow);
          resolve(normalized);
        } catch (error) {
          reject(error);
        }
      },
      error: (error: Error) => reject(error),
    });
  });
}

export async function fetchSurveyRows(): Promise<SurveyRow[]> {
  const response = await fetch("/data/data.csv", { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Varsayılan CSV dosyası okunamadı.");
  }

  const csvText = await response.text();
  return parseCsvText(csvText);
}

export async function parseUploadedCsvText(
  csvText: string
): Promise<SurveyRow[]> {
  return parseCsvText(csvText);
}

export async function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(String(reader.result ?? ""));
    };

    reader.onerror = () => {
      reject(new Error("Dosya okunamadı."));
    };

    reader.readAsText(file);
  });
}