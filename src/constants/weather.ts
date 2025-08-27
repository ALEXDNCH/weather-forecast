export const DAYTIME = {
  Night: "ночь",
  Morning: "утро",
  Day: "день",
  Evening: "вечер",
} as const;

export type Daytime = (typeof DAYTIME)[keyof typeof DAYTIME];

export const HOURLY_VARS = [
  "temperature_2m",
  "relative_humidity_2m",
  "weather_code",
  "wind_speed_10m",
];
export const CURRENT_VARS = [
  "relative_humidity_2m",
  "temperature_2m",
  "wind_speed_10m",
  "weather_code",
];

export const DAILY_VARS = ["weather_code", "temperature_2m_min", "temperature_2m_max"] as const;

export const DEFAULT_QUERY = {
  forecastDays: 7,
  timezone: "auto",
  timeformat: "iso8601" as const,
  wind_speed_unit: "ms" as const,
};
