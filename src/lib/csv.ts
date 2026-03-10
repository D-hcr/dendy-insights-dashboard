import Papa from "papaparse";
import { RawSurveyRow, SurveyRow } from "@/types/survey";
import { mapRawRow } from "@/lib/transformers";

export async function fetchSurveyRows(): Promise<SurveyRow[]> {
  const response = await fetch("/data/data.csv", { cache: "no-store" });
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<RawSurveyRow>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const normalized = results.data.map(mapRawRow);
          resolve(normalized);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => reject(error),
    });
  });
}