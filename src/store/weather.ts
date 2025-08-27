import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { FAVORITE_CITIES, type FavoriteCityValue, WEATHER_FORECAST_DAYS } from "@/constants";
import { getWeather } from "@/services";
import type { WeatherFetchResult } from "@/types";

export const useWeatherStore = defineStore("weather", () => {
  const city = ref<FavoriteCityValue>("Moscow");
  const cityLabel = computed(
    () => FAVORITE_CITIES.find((c) => c.value === city.value)?.label ?? city.value,
  );
  const setCity = (next: FavoriteCityValue) => (city.value = next);

  function useWeatherData(forecastDays: number = WEATHER_FORECAST_DAYS) {
    return useQuery<WeatherFetchResult, Error>({
      queryKey: computed(() => ["weather", city.value, forecastDays]),
      queryFn: () => getWeather(city.value, { forecastDays }),
    });
  }

  return { city, cityLabel, setCity, useWeatherData };
});
