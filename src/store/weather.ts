import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { FAVORITE_CITIES, type FavoriteCityValue } from "@/constants";
import { parseCurrent, parseHourlyToday, parseWeekly, getWeather } from "@/services";

export const useWeatherStore = defineStore("weather", () => {
  const city = ref<FavoriteCityValue>("Moscow");
  const cityLabel = computed(
    () => FAVORITE_CITIES.find((c) => c.value === city.value)?.label ?? city.value,
  );
  const setCity = (next: FavoriteCityValue) => (city.value = next);

  function useWeatherData(forecastDays: number = 7) {
    return useQuery({
      queryKey: computed(() => ["weather", city.value]),
      queryFn: () => getWeather(city.value, { forecastDays }),
      select: (res) => ({
        current: parseCurrent(res),
        hourly: parseHourlyToday(res),
        weekly: parseWeekly(res),
      }),
    });
  }

  return { city, cityLabel, setCity, useWeatherData };
});
