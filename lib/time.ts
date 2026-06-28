export type WorkingStatus = "Good Time" | "Lunch Time" | "After Hours" | "Not Recommended";

export interface MarketCity {
  city: string;
  country: string;
  region: string;
  timeZone: string;
}

export const marketCities: MarketCity[] = [
  { city: "Shenzhen", country: "China", region: "Asia", timeZone: "Asia/Shanghai" },
  { city: "New York", country: "United States", region: "North America", timeZone: "America/New_York" },
  { city: "Los Angeles", country: "United States", region: "North America", timeZone: "America/Los_Angeles" },
  { city: "Berlin", country: "Germany", region: "Europe", timeZone: "Europe/Berlin" },
  { city: "Paris", country: "France", region: "Europe", timeZone: "Europe/Paris" },
  { city: "Madrid", country: "Spain", region: "Europe", timeZone: "Europe/Madrid" },
  { city: "London", country: "United Kingdom", region: "Europe", timeZone: "Europe/London" },
  { city: "Dubai", country: "United Arab Emirates", region: "Middle East", timeZone: "Asia/Dubai" },
  { city: "Riyadh", country: "Saudi Arabia", region: "Middle East", timeZone: "Asia/Riyadh" },
  { city: "Lagos", country: "Nigeria", region: "Africa", timeZone: "Africa/Lagos" },
  { city: "Johannesburg", country: "South Africa", region: "Africa", timeZone: "Africa/Johannesburg" },
  { city: "Jakarta", country: "Indonesia", region: "Asia", timeZone: "Asia/Jakarta" },
  { city: "Manila", country: "Philippines", region: "Asia", timeZone: "Asia/Manila" },
  { city: "Sydney", country: "Australia", region: "Oceania", timeZone: "Australia/Sydney" },
  { city: "Bogota", country: "Colombia", region: "Latin America", timeZone: "America/Bogota" },
  { city: "Santiago", country: "Chile", region: "Latin America", timeZone: "America/Santiago" },
];

export function getZonedParts(timeZone: string, date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
    month: "short",
    day: "2-digit",
  }).formatToParts(date);

  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const hour = Number(value("hour"));
  const minute = Number(value("minute"));

  return {
    hour,
    minute,
    time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    date: `${value("weekday")}, ${value("month")} ${value("day")}`,
  };
}

export function getWorkingStatus(hour: number, minute: number): WorkingStatus {
  const total = hour * 60 + minute;
  if (total >= 9 * 60 && total <= 11 * 60 + 30) return "Good Time";
  if (total >= 12 * 60 && total <= 14 * 60) return "Lunch Time";
  if (total >= 14 * 60 && total <= 17 * 60 + 30) return "Good Time";
  if (total >= 18 * 60 && total <= 23 * 60) return "After Hours";
  return "Not Recommended";
}

export function getSuggestedAction(status: WorkingStatus) {
  if (status === "Good Time") return "Send Email / Send WhatsApp";
  if (status === "Lunch Time") return "Schedule Later";
  if (status === "After Hours") return "Wait until local morning";
  return "Do not contact now";
}
