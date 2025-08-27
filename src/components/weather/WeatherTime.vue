<script setup lang="ts">
  import { fmtTime, daytimeRu } from "@/utils/date";

  defineProps<{
    time: Date;
    tz?: string;
  }>();
</script>

<template>
  <div class="wtime">
    <div class="wtime__clock">{{ fmtTime(time, tz) }}</div>
    <div class="wtime__day">{{ daytimeRu(time, tz) }}</div>
  </div>
</template>

<style scoped lang="scss">
  .wtime {
    font-weight: 400;
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: var(--color-primary);
    font-size: var(--font-size-xs);
  }
</style>
