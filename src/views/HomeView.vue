<script setup lang="ts">
  import { useWeatherStore } from "@/store/weather";
  import { computed } from "vue";
  import { selectToday3hSlots } from "@/utils/day";
  import WeatherNowCard from "@/components/WeatherNowCard.vue";
  import WeatherHourlyTable from "@/components/weather/WeatherHourlyTable.vue";
  import MySkeleton from "@/components/ui/MySkeleton.vue";

  const weatherStore = useWeatherStore();
  const { data, isLoading, isError, error } = weatherStore.useWeatherData();
  const current = computed(() => data?.value?.current);
  const hourlyToday = computed(() => (data.value ? selectToday3hSlots(data.value.hourly) : []));
</script>

<template>
  <div class="mt-12">
    <MySkeleton v-if="isLoading" rounded="8px" height="60vh" />
    <template v-else-if="isError">Ошибка: {{ (error as Error).message }}</template>
    <div v-else-if="current" class="city-weather-forecast__wrapper">
      <WeatherNowCard
        :temp="current.temperature"
        :weather-code="current.weather_code"
        :humidity="current.humidity"
        :wind="current.wind_speed"
      />
      <WeatherHourlyTable v-if="hourlyToday?.length" :rows="hourlyToday" :tz="data?.tz" />
    </div>
  </div>
</template>

<style lang="scss">
  .city-weather-forecast__wrapper {
    display: flex;
    align-items: self-start;
    justify-content: space-between;
    gap: 100px;
    @media (max-width: 1100px) {
      flex-direction: column;
      gap: 50px;
    }
  }
</style>
