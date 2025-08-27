import type { DateLike } from "@/utils/date/type.ts";
import type { Daytime } from "@/constants";

export function toDate(input: DateLike): Date {
  return input instanceof Date ? input : new Date(input);
}

// weekday
export function formatRuWeekday(d: DateLike): string {
  return new Intl.DateTimeFormat("ru-RU", { weekday: "long" }).format(toDate(d)).toLowerCase();
}

// day + month
export function formatRuDayMonth(d: DateLike): string {
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" })
    .format(toDate(d))
    .toLowerCase();
}

export function formatRuTitle(d: DateLike = new Date()): string {
  const day = formatRuWeekday(d);
  const dm = formatRuDayMonth(d);
  return `${day}, ${dm}`;
}

/** HH:MM в заданной тайзоне (если tz не передан — локальная) */
export function fmtTime(d: Date, tz?: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

/** Час (0..23) в заданной тайзоне */
export function hourInTZ(d: Date, tz?: string): number {
  const parts = new Intl.DateTimeFormat("ru-RU", {
    timeZone: tz,
    hour: "2-digit",
    hour12: false,
  }).formatToParts(d);
  return Number(parts.find((p) => p.type === "hour")?.value ?? "0");
}

/** Период суток по-русски в заданной тайзоне */
export function daytimeRu(d: Date, tz?: string): Daytime {
  const h = hourInTZ(d, tz);
  if (h < 6) return "ночь";
  if (h < 12) return "утро";
  if (h < 18) return "день";
  return "вечер";
}
