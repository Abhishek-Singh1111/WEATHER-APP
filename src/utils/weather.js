export function normalizeCondition(description = "") {
  const text = String(description).toLowerCase();
  if (text.includes("thunder")) return "thunder";
  if (text.includes("snow")) return "snow";
  if (text.includes("rain") || text.includes("drizzle")) return "rain";
  if (text.includes("cloud")) return "cloud";
  if (text.includes("mist") || text.includes("fog") || text.includes("haze"))
    return "mist";
  return "clear";
}

export function formatLocalDateTime(unixSeconds, timezoneOffsetSeconds) {
  if (typeof unixSeconds !== "number" || typeof timezoneOffsetSeconds !== "number")
    return null;
  // We apply the location offset first, then read UTC fields so the viewer's
  // local timezone never affects the rendered time.
  const localMs = (unixSeconds + timezoneOffsetSeconds) * 1000;
  const d = new Date(localMs);

  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const weekday = weekdayNames[d.getUTCDay()] ?? "";
  const month = monthNames[d.getUTCMonth()] ?? "";
  const day = String(d.getUTCDate()).padStart(2, "0");
  const year = String(d.getUTCFullYear());

  const hours = d.getUTCHours();
  const minutes = String(d.getUTCMinutes()).padStart(2, "0");
  const hour12 = ((hours + 11) % 12) + 1;
  const meridiem = hours >= 12 ? "PM" : "AM";
  const time = `${String(hour12).padStart(2, "0")}:${minutes} ${meridiem}`;

  const sign = timezoneOffsetSeconds >= 0 ? "+" : "-";
  const abs = Math.abs(timezoneOffsetSeconds);
  const tzHours = String(Math.floor(abs / 3600)).padStart(2, "0");
  const tzMinutes = String(Math.floor((abs % 3600) / 60)).padStart(2, "0");
  const tz = `UTC${sign}${tzHours}:${tzMinutes}`;

  const date = `${weekday}, ${month} ${day}, ${year}`;
  return { date, time, tz };
}

export function heroVariantFromOpenWeather({
  icon,
  description,
  temp,
  feelsLike,
  coldThreshold = 8,
  hotThreshold = 30,
} = {}) {
  const iconText = typeof icon === "string" ? icon : "";
  const iconGroup = Number.parseInt(iconText.slice(0, 2), 10);

  let base =
    iconGroup === 11
      ? "thunder"
      : iconGroup === 13
        ? "snow"
        : iconGroup === 9 || iconGroup === 10
          ? "rain"
          : iconGroup === 50
            ? "mist"
            : iconGroup === 2 || iconGroup === 3 || iconGroup === 4
              ? "cloud"
              : iconGroup === 1
                ? "clear"
                : null;

  if (!base) base = normalizeCondition(description);

  const apparent =
    typeof feelsLike === "number" ? feelsLike : typeof temp === "number" ? temp : null;

  const allowsTempSwap = base === "clear" || base === "cloud" || base === "mist";
  if (allowsTempSwap && typeof apparent === "number") {
    if (apparent <= coldThreshold) return "cold";
    if (apparent >= hotThreshold) return "hot";
  }

  return base;
}
