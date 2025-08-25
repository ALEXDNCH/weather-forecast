import type { DateLike } from "@/utils/date/type.ts";

export function toDate(input: DateLike): Date {
  return input instanceof Date ? input : new Date(input);
}

// weekday
export function formatRuWeekdayLower(d: DateLike): string {
  return new Intl.DateTimeFormat("ru-RU", { weekday: "long" }).format(toDate(d)).toLowerCase();
}

// day + month
export function formatRuDayMonthLower(d: DateLike): string {
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" })
    .format(toDate(d))
    .toLowerCase();
}

export function formatRuTitle(d: DateLike = new Date()): string {
  const day = formatRuWeekdayLower(d);
  const dm = formatRuDayMonthLower(d);
  return `${day}, ${dm}`;
}
