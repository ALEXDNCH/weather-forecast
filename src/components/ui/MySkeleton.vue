<script setup lang="ts">
  defineProps<{
    circle?: boolean;
    rounded?: string;
    width?: string;
    height?: string;
  }>();
</script>

<template>
  <span
    class="skeleton"
    :style="{
      borderRadius: circle ? '50%' : rounded ? rounded : '4px',
      width: width ?? '100%',
      height: height ?? '1em',
    }"
  />
</template>

<style scoped lang="scss">
  .skeleton {
    position: relative;
    overflow: hidden;
    background: var(--color-gray-500);
    display: block;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, var(--color-gray-200), transparent);
      animation: progress 1.2s ease-in-out infinite;
    }
  }

  @keyframes progress {
    0% {
      transform: translate3d(-100%, 0, 0);
    }
    100% {
      transform: translate3d(100%, 0, 0);
    }
  }
</style>
