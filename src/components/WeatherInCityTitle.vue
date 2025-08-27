<script setup lang="ts">
  import { computed } from "vue";
  import type { FavoriteCityLabel } from "@/constants";
  import { useWeatherStore } from "@/store/weather";

  const props = defineProps<{
    city?: FavoriteCityLabel;
  }>();

  const weatherStore = useWeatherStore();
  const cityToShow = computed(() => props.city ?? weatherStore.cityLabel);
</script>

<template>
  <h1 class="title">Погода в городе {{ cityToShow }}</h1>
</template>
