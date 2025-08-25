import type { OMResponse, CurrentWeather, HourlyEntry, WeeklyDay } from "@/types";

export function parseCurrent(res: OMResponse): CurrentWeather | null {
  const cur = res.current();
  if (!cur) return null;

  return {
    time: new Date(Number(cur.time()) * 1000),
    temperature: cur.variables(0)?.value?.() ?? null,
    humidity: cur.variables(1)?.value?.() ?? null,
    precipitation: cur.variables(2)?.value?.() ?? null,
    weather_code: cur.variables(3)?.value?.() ?? null,
    wind_speed: cur.variables(4)?.value?.() ?? null,
  };
}

export function parseHourlyToday(res: OMResponse): HourlyEntry[] {
  const h = res.hourly();
  if (!h) return [];

  const start = Number(h.time());
  const end = Number(h.timeEnd());
  const step = h.interval();

  const total = Math.max(0, Math.floor((end - start) / step));
  const times = Array.from({ length: total }, (_, i) => new Date((start + i * step) * 1000));

  const arr = (i: number) => Array.from(h.variables(i)?.valuesArray?.() ?? []);

  const rows: HourlyEntry[] = times.map((t, i) => ({
    time: t,
    temperature: arr(0)[i],
    precipitation: arr(1)[i],
    humidity: arr(2)[i],
    weather_code: arr(3)[i],
    wind_speed: arr(4)[i],
  }));

  const today = new Date();
  const y = today.getFullYear(),
    m = today.getMonth(),
    d = today.getDate();

  const todayIdx0 = rows.findIndex(
    (r) =>
      r.time.getFullYear() === y &&
      r.time.getMonth() === m &&
      r.time.getDate() === d &&
      r.time.getHours() === 0,
  );
  if (todayIdx0 === -1) {
    return rows.filter(
      (r) =>
        r.time.getFullYear() === y &&
        r.time.getMonth() === m &&
        r.time.getDate() === d &&
        r.time.getHours() % 3 === 0,
    );
  }

  const out: HourlyEntry[] = [];
  for (let i = todayIdx0; i < rows.length; i += 3) {
    const r = rows[i];
    if (r.time.getFullYear() !== y || r.time.getMonth() !== m || r.time.getDate() !== d) break;
    out.push(r);
  }
  return out;
}

export function parseWeekly(res: OMResponse): WeeklyDay[] {
  const d = res.daily();
  if (!d) return [];

  const start = Number(d.time());
  const end = Number(d.timeEnd());
  const step = d.interval();

  const total = Math.max(0, Math.floor((end - start) / step));
  const days = Array.from({ length: total }, (_, i) => new Date((start + i * step) * 1000));

  const arr = (i: number) => Array.from(d.variables(i)?.valuesArray?.() ?? []);

  return days.map<WeeklyDay>((date, i) => ({
    date,
    t_min: arr(0)[i],
    t_max: arr(1)[i],
    precip_sum: arr(2)[i],
    weather_code: arr(3)[i],
    wind_speed_max: arr(4)[i],
  }));
}
