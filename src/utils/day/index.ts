import { WEATHER_FORECAST_INTERVAL_HOURS } from "@/constants";

// Границы «сегодня» в локальной тайзоне пользователя (в миллисекундах)
export function localTodayRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).getTime();
  const end = start + 24 * 60 * 60 * 1000;
  return { start, end };
}

// Является ли момент кратным N часам по локальному времени
export function isLocal3hSlot(d: Date) {
  return (
    d.getMinutes() === 0 &&
    d.getSeconds() === 0 &&
    d.getHours() % WEATHER_FORECAST_INTERVAL_HOURS === 0
  );
}

// Лежит ли дата 'd' внутри сегодняшних суток (локально)
export function isInLocalToday(d: Date) {
  const t = d.getTime();
  const { start, end } = localTodayRange();
  return t >= start && t < end;
}

export function selectToday3hSlots<T extends { time: Date }>(rows: T[]): T[] {
  return rows.filter((row) => isInLocalToday(row.time) && isLocal3hSlot(row.time));
}
