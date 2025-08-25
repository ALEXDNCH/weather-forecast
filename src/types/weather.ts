// interface for geocoding method
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

export interface GetWeatherParams {
  forecastDays?: number;
  hourly?: string[];
  current?: string[];
  daily?: string[];
  timezone?: string;
  timeformat?: "unixtime";
  wind_speed_unit?: "ms";
}

export interface OMBlock {
  time(): number;
  timeEnd(): number;
  interval(): number;
  variables(i: number): OMVar | null;
}

export interface OMVar {
  value?(): number | null;
  valuesArray?(): Float32Array | null;
}

export interface OMResponse {
  latitude(): number;
  longitude(): number;
  elevation(): number;
  utcOffsetSeconds(): number;

  current(): OMBlock | null;
  hourly(): OMBlock | null;
  daily(): OMBlock | null;
}

export interface CurrentWeather {
  time: Date;
  temperature: number | null;
  humidity: number | null;
  precipitation: number | null;
  weather_code: number | null;
  wind_speed: number | null;
}

export interface HourlyEntry {
  time: Date;
  temperature: number;
  precipitation: number;
  humidity: number;
  weather_code: number;
  wind_speed: number;
}

export interface WeeklyDay {
  date: Date;
  t_min: number;
  t_max: number;
  precip_sum: number;
  weather_code: number;
  wind_speed_max: number;
}
