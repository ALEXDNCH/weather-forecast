<script setup lang="ts">
  import WeatherHourlyRow from "@/components/weather/WeatherHourlyRow.vue";

  defineProps<{
    rows: Array<{
      time: Date;
      temperature: number;
      weather_code: number;
      wind_speed: number;
      humidity: number;
    }>;
    tz?: string;
  }>();
</script>

<template>
  <table class="hrow-table">
    <colgroup>
      <col style="width: 16%" />
      <col style="width: 14%" />
      <col style="width: 12%" />
      <col style="width: 28%" class="mobile-hidden" />
      <col style="width: 15%" />
      <col style="width: 15%" />
    </colgroup>

    <tbody>
      <WeatherHourlyRow
        v-for="h in rows"
        :key="h.time.toISOString()"
        :time="h.time"
        :temp="h.temperature"
        :weather-code="h.weather_code"
        :wind="h.wind_speed"
        :humidity="h.humidity"
        :tz="tz"
      />
    </tbody>
  </table>
</template>

<style scoped lang="scss">
  .hrow-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    & tbody {
      border-spacing: 12px 8px;
    }
  }
</style>
