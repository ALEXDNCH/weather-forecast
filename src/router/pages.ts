import HomeView from "@/views/HomeView.vue";

export const PAGES = {
  home: {
    name: "home",
    path: "/:city?",
    label: "Главная",
    component: HomeView,
  },
  weather_weekly: {
    name: "weather_weekly",
    path: "/:city/weather-weekly",
    label: "Погода на неделю",
    component: () => import("@/views/WeatherWeeklyView.vue"),
  },
} as const;
