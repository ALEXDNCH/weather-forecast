import { fetchWeatherApi } from "openmeteo";
import { getGeocoding } from "./getGeocoding";
import { WEATHER_API_URL } from "./index";
import type { GetWeatherParams, OMResponse } from "@/types";
import { CURRENT_VARS, DAILY_VARS, DEFAULT_QUERY, HOURLY_VARS } from "@/constants";

export async function getWeather(city: string, params: GetWeatherParams = {}): Promise<OMResponse> {
  const geo = await getGeocoding(city);
  if (!geo) throw new Error("Город не найден");

  const opts = { ...DEFAULT_QUERY, ...params };

  const query = {
    latitude: geo.latitude,
    longitude: geo.longitude,
    forecast_days: Math.max(1, Math.min(opts.forecastDays, 7)),
    timezone: opts.timezone,
    timeformat: opts.timeformat,
    wind_speed_unit: opts.wind_speed_unit,
    hourly: opts.hourly ?? [...HOURLY_VARS],
    current: opts.current ?? [...CURRENT_VARS],
    daily: opts.daily ?? [...DAILY_VARS],
  };

  const responses = await fetchWeatherApi(WEATHER_API_URL, query);
  const response = responses[0] as unknown as OMResponse;
  if (!response) throw new Error("Нет ответа от Open‑Meteо");

  return response;
}
