<script setup lang="ts">
  import AppNav from "@/components/layout/AppNav.vue";
  import BaseSelect from "@/components/ui/BaseSelect.vue";
  import { FAVORITE_CITIES, type FavoriteCityValue } from "@/constants/favorites";
  import { storeToRefs } from "pinia";
  import { useWeatherStore } from "@/store/weather";

  const weatherStore = useWeatherStore();
  const { city } = storeToRefs(weatherStore);
  const { setCity } = weatherStore;

  const onCityChange = (v: string) => {
    if (v) setCity(v as FavoriteCityValue);
  };
</script>

<template>
  <header class="header-wrapper">
    <AppNav />
    <BaseSelect :model-value="city" :items="FAVORITE_CITIES" @update:model-value="onCityChange" />
  </header>
</template>

<style lang="scss">
  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 767px) {
      flex-direction: column;
      gap: 30px;
      align-items: self-start;
    }
  }
</style>
