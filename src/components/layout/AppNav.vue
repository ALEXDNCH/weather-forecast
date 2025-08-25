<script setup lang="ts">
  import { PAGES } from "@/router/pages";

  const NAV_LINKS = Object.entries(PAGES).map(([, page]) => ({
    to: page.path,
    label: page.label,
  }));
</script>

<template>
  <nav class="nav">
    <RouterLink v-for="link in NAV_LINKS" :key="link.label" :to="link.to" class="nav__item">
      {{ link.label }}
    </RouterLink>
  </nav>
</template>

<style lang="scss">
  @use "@/assets/styles/mixin" as m;
  .nav {
    display: inline-flex;
    align-items: stretch;
    border-radius: var(--br-base);
    overflow: hidden;
    & .nav__item {
      display: block;
      @include m.base-btn-padding;
      @include m.transition-base;
      color: var(--color-gray-300);
      background: var(--color-gray-500);
      font-weight: 500;
      font-size: var(--font-size-lg);
      &:not(:first-child) {
        border-left: 1px solid var(--color-gray-300);
      }
      &:focus-visible {
        background: var(--color-gray-300);
      }
      &.router-link-exact-active {
        color: var(--color-primary);
      }
    }
  }
</style>
