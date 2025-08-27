<script setup lang="ts">
  import WeatherIcon from "@/components/weather/WeatherIcon.vue";
  import WeatherTemp from "@/components/weather/WeatherTemp.vue";
  import WeatherMetaItem from "@/components/weather/WeatherMetaItem.vue";
  import WeatherMetaStatus from "@/components/weather/WeatherMetaStatus.vue";
  import { useCityParam } from "@/composables/useCityParam";
  import { getWeatherInfo } from "@/utils/weatherCodes";
  import type { FavoriteCityLabel, FavoriteCityValue } from "@/constants";

  const props = defineProps<{
    city: { value: FavoriteCityValue; label: FavoriteCityLabel };
    weatherCode: number;
    temp: number;
    humidity: number;
  }>();

  const wi = getWeatherInfo(props.weatherCode);
  const { cityLink } = useCityParam();
</script>

<template>
  <RouterLink :to="cityLink(props.city.value)" class="pcard" role="button">
    <h3 class="pcard__title">{{ city.label }}</h3>
    <WeatherMetaStatus size="medium" :description="wi?.description ?? '-'" />
    <WeatherIcon :icon="wi!.icon" variant="small" />
    <WeatherTemp :temp="temp" variant="medium" />
    <WeatherMetaItem label="Влажность" :value="Math.round(humidity)" unit="%" size="medium" />
  </RouterLink>
</template>

<style scoped lang="scss">
  @use "@/assets/styles/mixin" as m;
  .pcard {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    gap: 16px;
    padding: 25px;
    border: 1px solid var(--color-gray-400);
    border-radius: 8px;
    background: radial-gradient(
      163.87% 184.27% at -17.89% -22.86%,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(238, 237, 237, 0.1) 100%
    );
    transition: all 0.3s ease;

    &:hover {
      border-color: var(--color-primary, #fff);
      @include m.card-shadow;
    }

    &__title {
      color: var(--color-primary);
      font-weight: 500;
      font-size: var(--font-size-lg);
      text-align: center;
    }
  }
</style>
