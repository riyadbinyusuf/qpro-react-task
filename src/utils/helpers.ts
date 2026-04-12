export function toQueryString(obj: Record<string, any>) {
  return new URLSearchParams(
    Object.entries(obj).filter(
      ([_, v]) => v !== null && v !== undefined && v !== ""
    )
  ).toString();
}