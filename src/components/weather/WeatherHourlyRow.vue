<script setup lang="ts">
  import WeatherIcon from "@/components/weather/WeatherIcon.vue";
  import WeatherMetaItem from "@/components/weather/WeatherMetaItem.vue";
  import WeatherMetaStatus from "@/components/weather/WeatherMetaStatus.vue";
  import WeatherTemp from "@/components/weather/WeatherTemp.vue";
  import WeatherTime from "@/components/weather/WeatherTime.vue";
  import { getWeatherInfo } from "@/utils/weatherCodes";

  const props = defineProps<{
    time: Date;
    temp: number;
    weatherCode: number;
    wind: number;
    humidity: number;
    tz?: string;
  }>();

  const wi = getWeatherInfo(props.weatherCode);
</script>

<template>
  <tr class="hrow">
    <td class="hrow__cell">
      <WeatherTime :time="time" :tz="tz" />
    </td>

    <td class="hrow__cell">
      <WeatherTemp :temp="temp" variant="medium" />
    </td>

    <td class="hrow__cell">
      <WeatherIcon :icon="wi!.icon" variant="small" />
    </td>

    <td class="hrow__cell mobile-hidden">
      <WeatherMetaStatus size="medium" :description="wi?.description ?? '-'" />
    </td>

    <td class="hrow__cell">
      <WeatherMetaItem :value="Math.round(wind)" unit="м/с" size="medium" />
    </td>

    <td class="hrow__cell">
      <WeatherMetaItem :value="Math.round(humidity)" unit="%" size="medium" />
    </td>
  </tr>
</template>

<style scoped lang="scss">
  .hrow {
    border-bottom: 1px solid var(--color-gray-500);
    &__cell {
      padding: 10px 8px;
      vertical-align: middle;
      text-align: center;
      white-space: nowrap;
    }
  }
</style>
