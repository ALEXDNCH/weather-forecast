<script setup lang="ts">
  import WeatherMetaItem from "./WeatherMetaItem.vue";
  import type { MetaSize } from "@/types";

  withDefaults(
    defineProps<{
      wind: number;
      size: MetaSize;
    }>(),
    { wind: 0 },
  );
</script>

<template>
  <WeatherMetaItem label="Ветер" :value="Math.round(wind)" unit="м/с" :size="size" />
</template>
