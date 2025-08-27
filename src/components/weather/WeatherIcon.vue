<script setup lang="ts">
  type Variant = "large" | "small";

  withDefaults(
    defineProps<{
      icon: string;
      alt?: string;
      variant?: Variant;
    }>(),
    { alt: "weather icon", variant: "large" },
  );
</script>

<template>
  <div class="wicon" :class="variant">
    <img :src="`/images/weather/${icon}`" :alt />
  </div>
</template>

<style scoped lang="scss">
  @use "@/assets/styles/mixin" as m;
  .wicon {
    display: grid;
    place-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &.large {
      @include m.fluid(width, 100px, 160px);
      @include m.fluid(height, 100px, 160px);
    }
    &.small {
      @include m.fluid(width, 40px, 60px);
      @include m.fluid(height, 40px, 60px);
    }
  }
</style>
