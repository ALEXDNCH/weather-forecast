<script setup lang="ts">
  import WeatherMetaItem from "./WeatherMetaItem.vue";
  import type { MetaSize } from "@/types";

  withDefaults(
    defineProps<{
      humidity: number;
      size: MetaSize;
    }>(),
    { humidity: 0 },
  );
</script>

<template>
  <WeatherMetaItem label="Влажность" :value="Math.round(humidity)" unit="%" :size="size" />
</template>
