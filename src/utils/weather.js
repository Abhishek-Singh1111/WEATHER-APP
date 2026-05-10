export function normalizeCondition(description = "") {
  const text = String(description).toLowerCase();
  if (text.includes("thunder")) return "thunder";
  if (text.includes("snow")) return "snow";
  if (text.includes("rain") || text.includes("drizzle")) return "rain";
  if (text.includes("cloud")) return "cloud";
  if (text.includes("mist") || text.includes("fog") || text.includes("haze"))
    return "mist";
  return "sun";
}

export function formatLocalDateTime(unixSeconds, timezoneOffsetSeconds) {
  if (typeof unixSeconds !== "number" || typeof timezoneOffsetSeconds !== "number")
    return null;
  const localMs = (unixSeconds + timezoneOffsetSeconds) * 1000;
  const d = new Date(localMs);
  // Render using UTC to avoid applying the viewer's local timezone twice.
  const date = d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
  const time = d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
  return { date, time };
}
