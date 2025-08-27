<script setup lang="ts">
  import { useWeatherStore } from "@/store/weather";
  import WeeklyList from "@/components/weekly/WeeklyList.vue";
  import MySkeleton from "@/components/ui/MySkeleton.vue";
  const weatherStore = useWeatherStore();
  const { data, isLoading, isError, error } = weatherStore.useWeatherData();
</script>

<template>
  <div class="mt-12">
    <MySkeleton v-if="isLoading" rounded="8px" height="20vh" />
    <template v-else-if="isError">Ошибка: {{ (error as Error).message }}</template>
    <WeeklyList v-else :days="data!.weekly" />
  </div>
</template>
