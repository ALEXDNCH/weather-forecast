// composables/useCityParam.ts
import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { FAVORITE_CITIES, type FavoriteCityValue } from "@/constants";
import { useWeatherStore } from "@/store/weather";

function normalizeCity(raw?: string | string[]): FavoriteCityValue {
  const val = Array.isArray(raw) ? raw[0] : raw;
  const hit = FAVORITE_CITIES.find((c) => c.value.toLowerCase() === (val ?? "").toLowerCase());
  return (hit?.value ?? "Moscow") as FavoriteCityValue;
}

export function useCityParam() {
  const route = useRoute();
  const router = useRouter();
  const store = useWeatherStore();

  const needsCityParam = computed(() => route.matched.some((r) => r.path.includes(":city")));

  const cityLink = (next: FavoriteCityValue) => ({
    name: route.name as string,
    params: { ...route.params, city: next },
    query: route.query,
  });

  function setCityAndNavigate(next: FavoriteCityValue, replace = false) {
    store.setCity(next);
    const to = cityLink(next);
    return replace ? router.replace(to) : router.push(to);
  }

  onMounted(() => {
    const normalized = normalizeCity(route.params.city as FavoriteCityValue);
    store.setCity(normalized);

    if (needsCityParam.value) {
      const raw = Array.isArray(route.params.city)
        ? route.params.city[0]
        : (route.params.city as string | undefined);

      if (!raw || raw.toLowerCase() !== normalized.toLowerCase()) {
        router.replace(cityLink(normalized));
      }
    }
  });
  watch(
    () => route.params.city,
    (val) => {
      store.setCity(normalizeCity(val as FavoriteCityValue));
    },
  );

  const city = computed(() => store.city);
  const cityLabel = computed(() => store.cityLabel);

  return {
    city,
    cityLabel,
    cityLink, // для <RouterLink :to="cityLink(...)" />
    setCityAndNavigate, // для @click
    normalizeCity,
  };
}
