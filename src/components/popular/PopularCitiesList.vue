<script setup lang="ts">
  import PopularCityCard from "./PopularCityCard.vue";
  import MySkeleton from "@/components/ui/MySkeleton.vue";
  import { FAVORITE_CITIES, WEATHER_FORECAST_DAYS } from "@/constants";
  import { getWeather } from "@/services";
  import { useQueries } from "@tanstack/vue-query";
  import { onMounted } from "vue";

  const cities = FAVORITE_CITIES.slice(0, 5);

  const queries = useQueries({
    queries: cities.map((city) => ({
      queryKey: ["weather", city.value, WEATHER_FORECAST_DAYS],
      queryFn: () => getWeather(city.value, { forecastDays: WEATHER_FORECAST_DAYS }),
    })),
  });

  onMounted(() => {
    console.log("mounted popular cities");
  });
</script>

<template>
  <section class="plist">
    <h2 class="title">Погода в популярных городах</h2>

    <ul class="plist__wrapper">
      <li v-for="(q, idx) in queries" :key="cities[idx].value" class="plist__item">
        <MySkeleton v-if="q.isLoading" rounded="8px" height="310px" />
        <template v-else-if="q.isError">
          <div class="pcard pcard--error">
            <h3 class="pcard__title">{{ cities[idx].label }}</h3>
            <p>Ошибка: {{ (q.error as Error).message }}</p>
          </div>
        </template>
        <PopularCityCard
          v-else
          :city="cities[idx]"
          :weather-code="q.data!.current!.weather_code"
          :temp="Math.round(q.data!.current!.temperature)"
          :humidity="Math.round(q.data!.current!.humidity)"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
  .plist {
    &__wrapper {
      display: flex;
      justify-content: space-between;
      overflow: auto;
      gap: 37px;
      padding-block: 32px;
    }
    .plist__item {
      flex: 0 0 240px;
    }
    .pcard--error {
      color: var(--color-primary);
      border: 1px solid var(--color-gray-400);
      border-radius: 8px;
      padding: 24px;
      text-align: center;
      min-height: 310px;
      display: grid;
      place-items: center;
    }
  }
</style>
