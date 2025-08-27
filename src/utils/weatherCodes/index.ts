import { WEATHER_CODES, type WeatherInfo } from "@/constants";

export function getWeatherInfo(code: number): WeatherInfo | undefined {
  return WEATHER_CODES[code];
}
