<script setup lang="ts">
  import WeatherMetaItem from "./WeatherMetaItem.vue";
  import type { MetaSize } from "@/types";

  withDefaults(
    defineProps<{
      description: string;
      size: MetaSize;
    }>(),
    { description: "—" },
  );
</script>

<template>
  <WeatherMetaItem :value="description" :size="size" />
</template>
