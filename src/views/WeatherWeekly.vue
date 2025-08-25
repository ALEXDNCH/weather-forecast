<script setup lang="ts">
  import { useWeatherStore } from "@/store/weather";
  const weatherStore = useWeatherStore();
  const { data: days, isLoading, isError, error } = weatherStore.useWeatherData();
</script>

<template>
  <section v-if="isLoading">Загрузка…</section>
  <section v-else-if="isError">Ошибка: {{ (error as any)?.message }}</section>
  <ul v-else-if="days?.weekly?.length">
    <li v-for="d in days.weekly" :key="d.date.toDateString()">
      {{ d.date.toLocaleDateString() }} — {{ Math.round(d.t_min) }}° / {{ Math.round(d.t_max) }}°
    </li>
  </ul>
</template>
