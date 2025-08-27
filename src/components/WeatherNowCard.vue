<script setup lang="ts">
  import { getWeatherInfo } from "@/utils/weatherCodes";
  import WeatherIcon from "@/components/weather/WeatherIcon.vue";
  import WeatherTemp from "@/components/weather/WeatherTemp.vue";
  import WeatherMetaStatus from "@/components/weather/WeatherMetaStatus.vue";
  import WeatherMetaHumidity from "@/components/weather/WeatherMetaHumidity.vue";
  import WeatherMetaWind from "@/components/weather/WeatherMetaWind.vue";

  defineProps<{
    temp: number;
    weatherCode: number;
    humidity: number;
    wind: number;
  }>();
</script>

<template>
  <section class="weather-now">
    <div class="weather-now-item">
      <WeatherIcon :icon="getWeatherInfo!(weatherCode)!.icon" variant="large" />
      <WeatherTemp :temp="temp" variant="large" />
    </div>

    <div class="weather-now-item">
      <div class="weather-now__meta">
        <WeatherMetaStatus
          size="large"
          :description="getWeatherInfo(weatherCode)?.description ?? ''"
        />
        <WeatherMetaHumidity size="large" :humidity="humidity" />
        <WeatherMetaWind size="large" :wind="wind" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .weather-now {
    --wn-gap: 30px;
    --wn-meta-gap: 10px;

    display: flex;
    align-items: center;
    gap: var(--wn-gap);

    &-item {
      display: flex;
      align-items: center;
      gap: inherit;
    }

    &__meta {
      display: flex;
      flex-direction: column;
      gap: var(--wn-meta-gap);
    }

    @media (max-width: 1350px) {
      flex-wrap: wrap;
      --wn-gap: 25px;
      --wn-meta-gap: 6px;
    }

    @media (max-width: 1100px) {
      width: 100%;
      background: var(--color-gray-500);
      border-radius: var(--br-base);
      padding: 20px;
      justify-content: center;
    }
    @media (max-width: 500px) {
      padding: 15px;
      justify-content: center;
      --wn-gap: 10px;
      --wn-meta-gap: 2px;
    }
  }
</style>
