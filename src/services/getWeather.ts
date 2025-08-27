import { fetchWeatherApi } from "openmeteo";
import { getGeocoding } from "./getGeocoding";
import { WEATHER_API_URL } from "./index";
import type {
  GetWeatherParams,
  WeatherFetchResult,
  OMResponse,
  HourlyEntry,
  WeeklyDay,
  CurrentWeather,
} from "@/types/weather";
import {
  CURRENT_VARS,
  DAILY_VARS,
  DEFAULT_QUERY,
  HOURLY_VARS,
  WEATHER_FORECAST_DAYS,
  WEATHER_REQUEST_DELAY_MS,
} from "@/constants";
import { userTimeZone } from "@/utils/timezone";
import { values } from "@/utils/openmeteo";
import { wait } from "@/utils/wait";

const mustNum = (v: { value?: () => number | null } | null | undefined, name: string): number => {
  const x = v?.value?.();
  if (typeof x === "number") return x;
  throw new Error(`Open-Meteo: поле current.${name} отсутствует`);
};

export async function getWeather(
  city: string,
  params: GetWeatherParams = {},
): Promise<WeatherFetchResult> {
  const geo = await getGeocoding(city);
  if (!geo) throw new Error("Город не найден");

  const tz = geo.timezone;
  const opts = { ...DEFAULT_QUERY, ...params };

  const query = {
    latitude: geo.latitude,
    longitude: geo.longitude,
    forecast_days: Math.max(
      1,
      Math.min(opts.forecastDays ?? WEATHER_FORECAST_DAYS, WEATHER_FORECAST_DAYS),
    ),
    timezone: userTimeZone,
    timeformat: "unixtime" as const,
    wind_speed_unit: opts.wind_speed_unit ?? "ms",
    hourly: opts.hourly ?? [...HOURLY_VARS],
    current: opts.current ?? [...CURRENT_VARS],
    daily: opts.daily ?? [...DAILY_VARS],
  };

  const responses = await fetchWeatherApi(WEATHER_API_URL, query);
  const res: OMResponse | undefined = responses[0];
  if (!res) throw new Error("Нет ответа от OpenMeteо");

  let current: CurrentWeather | undefined;
  const cur = res.current();
  if (cur) {
    current = {
      time: new Date(Number(cur.time()) * 1000),
      humidity: mustNum(cur.variables(0), "relative_humidity_2m"),
      temperature: mustNum(cur.variables(1), "temperature_2m"),
      wind_speed: mustNum(cur.variables(2), "wind_speed_10m"),
      weather_code: mustNum(cur.variables(3), "weather_code"),
    };
  }

  const h = res.hourly();
  let hourly: HourlyEntry[] = [];
  if (h) {
    const start = Number(h.time());
    const end = Number(h.timeEnd());
    const step = h.interval();
    const total = Math.max(0, Math.floor((end - start) / step));

    const times = Array.from({ length: total }, (_, i) => new Date((start + i * step) * 1000));
    const t = values(h.variables(0)); // temperature_2m
    const rh = values(h.variables(1)); // relative_humidity_2m
    const wc = values(h.variables(2)); // weather_code
    const ws = values(h.variables(3)); // wind_speed_10m

    hourly = times.map((time, i) => ({
      time,
      temperature: t[i],
      humidity: rh[i],
      weather_code: wc[i],
      wind_speed: ws[i],
    }));
  }

  const d = res.daily();
  let weekly: WeeklyDay[] = [];
  if (d) {
    const start = Number(d.time());
    const end = Number(d.timeEnd());
    const step = d.interval();
    const total = Math.max(0, Math.floor((end - start) / step));

    const days = Array.from({ length: total }, (_, i) => new Date((start + i * step) * 1000));
    const d0 = values(d.variables(0)); // weather_code
    const d1 = values(d.variables(1)); // t_min
    const d2 = values(d.variables(2)); // t_max

    weekly = days.map<WeeklyDay>((date, i) => ({
      date,
      weather_code: d0[i],
      t_min: d1[i],
      t_max: d2[i],
    }));
  }

  await wait(WEATHER_REQUEST_DELAY_MS);
  return { tz, current, hourly, weekly };
}
