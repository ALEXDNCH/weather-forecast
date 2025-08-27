<script setup lang="ts">
  import type { MetaSize } from "@/types";

  const props = withDefaults(
    defineProps<{
      label?: string;
      value: string | number;
      unit?: string;
      size?: MetaSize;
    }>(),
    {
      label: "",
      unit: "",
      size: "large",
    },
  );
</script>

<template>
  <div class="wmeta__item" :class="[`wmeta__item--${props.size}`]">
    <span v-if="label" class="wmeta__label">{{ label }}:&nbsp;</span>
    <span class="wmeta__value">{{ value }}</span>
    <span v-if="unit" class="wmeta__unit">&nbsp;{{ unit }}</span>
  </div>
</template>

<style scoped lang="scss">
  .wmeta__item {
    color: var(--color-primary);
    font-weight: 500;
    display: flex;

    &--large {
      font-size: var(--font-size-md);
    }
    &--medium {
      font-size: var(--font-size-xs);
    }

    @media (max-width: 567px) {
      &--large {
        font-size: var(--font-size-sm);
      }
      &--medium {
        font-size: var(--font-size-xs);
      }
    }
  }
</style>
