import { fetchWeatherApi } from "openmeteo";

// Геокодинг
export interface IGeoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  country: string;
  country_code: string;
  country_id: number;
  admin1: string;
  admin1_id: number;
  feature_code: string;
  population: number;
  timezone: string;
}

export type OMResponse = Awaited<ReturnType<typeof fetchWeatherApi>>[number];

export type HourlyEntry = {
  time: Date;
  temperature: number;
  humidity: number;
  weather_code: number;
  wind_speed: number;
};

export type WeeklyDay = {
  date: Date;
  weather_code: number;
  t_min: number;
  t_max: number;
};

export type CurrentWeather = {
  time: Date;
  humidity: number;
  temperature: number;
  wind_speed: number;
  weather_code: number;
};

export type WeatherFetchResult = {
  tz: string;
  current?: CurrentWeather;
  hourly: HourlyEntry[];
  weekly: WeeklyDay[];
};

export type GetWeatherParams = {
  forecastDays?: number;
  hourly?: string[];
  current?: string[];
  daily?: string[];
  timezone?: string;
  timeformat?: "unixtime" | "iso8601";
  wind_speed_unit?: "kmh" | "ms";
};
