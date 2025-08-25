const COMMON = [
  "temperature_2m",
  "relative_humidity_2m",
  "precipitation",
  "weather_code",
  "wind_speed_10m",
] as const;

export const HOURLY_VARS = COMMON;
export const CURRENT_VARS = COMMON;

export const DAILY_VARS = [
  "temperature_2m_min",
  "temperature_2m_max",
  "precipitation_sum",
  "weather_code",
  "windspeed_10m_max",
] as const;

export const DEFAULT_QUERY = {
  forecastDays: 7,
  timezone: "auto",
  timeformat: "unixtime" as const,
  wind_speed_unit: "ms" as const,
};
