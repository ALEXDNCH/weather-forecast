<script setup lang="ts">
  import WeeklyItem from "./WeeklyItem.vue";
  import type { WeeklyDay } from "@/types/weather";

  defineProps<{
    days: WeeklyDay[];
  }>();
</script>

<template>
  <div class="wweek">
    <WeeklyItem
      v-for="(d, i) in days"
      :key="d.date.toISOString() + '-' + i"
      :date="d.date"
      :weather-code="d.weather_code"
      :temp="d.t_max"
    />
  </div>
</template>

<style scoped lang="scss">
  .wweek {
    display: flex;
    align-items: center;
    gap: 20px;
    overflow: auto;
    padding-bottom: 20px;

    @media (max-width: 567px) {
      gap: 10px;
    }
  }
</style>
