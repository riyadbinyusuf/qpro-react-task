import { FORM_DATA_STORAGE_KEY } from "./constants";

export function toQueryString(obj: Record<string, any>) {
  return new URLSearchParams(
    Object.entries(obj).filter(
      ([_, v]) => v !== null && v !== undefined && v !== "",
    ),
  ).toString();
}

export function saveToStorage(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromStorage(key: string) {
  try {
    const storageRawItem = localStorage.getItem(key);
    return storageRawItem ? JSON.parse(storageRawItem) : null;
  } catch {
    return null;
  }
}
