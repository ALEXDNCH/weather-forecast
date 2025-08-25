<script setup lang="ts">
  import { computed } from "vue";
  import { formatRuTitle } from "@/utils/date";
  import type { DateLike } from "@/utils/date/type.ts";

  const props = withDefaults(defineProps<{ date?: DateLike }>(), {
    date: () => new Date(),
  });

  const title = computed(() => formatRuTitle(props.date));
</script>

<template>
  <h2 class="today-date-title">{{ title }}</h2>
</template>

<style scoped lang="scss">
  .today-date-title {
    color: var(--color-gray-200);
    font-size: var(--font-size-xl);
    font-weight: 500;
  }
</style>
