<script setup lang="ts">
  type Variant = "large" | "medium" | "small";

  withDefaults(
    defineProps<{
      temp: number;
      variant?: Variant;
    }>(),
    { variant: "large" },
  );
</script>

<template>
  <div class="wtemp" :class="variant">
    <span>{{ Math.round(temp) }}°</span>
  </div>
</template>

<style scoped lang="scss">
  .wtemp {
    color: var(--color-primary);

    &.large span {
      font-size: var(--font-size-5xl);
      font-weight: 700;
    }
    &.medium span {
      font-size: var(--font-size-3xl);
      font-weight: 600;
    }
    &.small span {
      font-size: var(--font-size-xs);
      font-weight: 500;
    }

    @media (max-width: 567px) {
      &.medium span {
        font-size: var(--font-size-xl);
        font-weight: 600;
      }
    }
  }
</style>
