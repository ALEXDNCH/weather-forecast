<script setup lang="ts">
  import WeatherIcon from "@/components/weather/WeatherIcon.vue";
  import WeatherTemp from "@/components/weather/WeatherTemp.vue";
  import { getWeatherInfo } from "@/utils/weatherCodes";
  import { formatRuWeekday } from "@/utils/date";

  const props = defineProps<{
    date: Date;
    weatherCode: number;
    temp: number;
  }>();

  const wi = getWeatherInfo(props.weatherCode);
</script>

<template>
  <div class="wday">
    <div class="wday__weekday">{{ formatRuWeekday(date) }}</div>
    <WeatherIcon :icon="wi!.icon" variant="small" />
    <WeatherTemp :temp="temp" variant="small" />
  </div>
</template>

<style scoped lang="scss">
  .wday {
    display: flex;
    flex-direction: column;
    flex: 0 0 120px;
    align-items: center;
    text-align: center;
    gap: 8px;

    &__weekday {
      color: var(--color-primary);
      font-weight: 400;
      font-size: var(--font-size-xs);
      text-transform: capitalize;
    }
  }
</style>
