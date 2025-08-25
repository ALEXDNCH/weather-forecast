<script setup lang="ts">
  import { useWeatherStore } from "@/store/weather";
  import WeatherInCityTitle from "@/components/WeatherInCityTitle.vue";
  import TodayDateTitle from "@/components/TodayDateTitle.vue";

  const weatherStore = useWeatherStore();
  const {
    data: hours,
    isLoading: hoursLoading,
    isError: hoursIsError,
    error: hoursError,
  } = weatherStore.useWeatherData();
</script>

<template>
  <main class="content">
    <WeatherInCityTitle />
    <TodayDateTitle />
    <section v-if="hoursLoading">Загрузка…</section>
    <section v-else-if="hoursIsError">Ошибка: {{ (hoursError as any)?.message }}</section>
    <section v-else>
      Погода в городе {{ weatherStore.cityLabel }}
      <ul>
        <li v-for="h in hours?.hourly" :key="h.time.toDateString()">
          {{ h.time }} — {{ Math.round(h.temperature) }}°C
        </li>
      </ul>
    </section>
  </main>
</template>
