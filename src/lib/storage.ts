const STORAGE_KEYS = {
  csvText: "dendy_uploaded_csv_text",
  csvName: "dendy_uploaded_csv_name",
  csvUpdatedAt: "dendy_uploaded_csv_updated_at",
};

export function saveUploadedCsv(csvText: string, fileName: string) {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEYS.csvText, csvText);
  localStorage.setItem(STORAGE_KEYS.csvName, fileName);
  localStorage.setItem(STORAGE_KEYS.csvUpdatedAt, new Date().toISOString());
}

export function getUploadedCsv() {
  if (typeof window === "undefined") {
    return {
      csvText: null,
      fileName: null,
      updatedAt: null,
    };
  }

  return {
    csvText: localStorage.getItem(STORAGE_KEYS.csvText),
    fileName: localStorage.getItem(STORAGE_KEYS.csvName),
    updatedAt: localStorage.getItem(STORAGE_KEYS.csvUpdatedAt),
  };
}

export function clearUploadedCsv() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEYS.csvText);
  localStorage.removeItem(STORAGE_KEYS.csvName);
  localStorage.removeItem(STORAGE_KEYS.csvUpdatedAt);
}