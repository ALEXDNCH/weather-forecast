import HomeView from "@/views/HomeView.vue";

export const PAGES = {
  home: {
    path: "/",
    label: "Главная",
    component: HomeView,
  },
  weather_weekly: {
    path: "/weather-weekly",
    label: "Погода на неделю",
    component: () => import("@/views/WeatherWeekly.vue"),
  },
} as const;
