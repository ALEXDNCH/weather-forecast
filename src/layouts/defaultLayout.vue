<script setup lang="ts">
  import WeatherInCityTitle from "@/components/WeatherInCityTitle.vue";
  import TodayDateTitle from "@/components/TodayDateTitle.vue";
  import PopularCitiesList from "@/components/popular/PopularCitiesList.vue";
  import Header from "@/components/layout/Header.vue";
</script>

<template>
  <Header />
  <main>
    <section class="content">
      <WeatherInCityTitle />
      <TodayDateTitle class="mt-3" />
      <slot />
    </section>

    <section class="content">
      <PopularCitiesList />
    </section>
  </main>
</template>
