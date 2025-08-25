import { createApp } from "vue";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import type { VueQueryPluginOptions } from "@tanstack/vue-query";
import "@/assets/styles/reset.css";
import "@/assets/styles/style.scss";
import App from "./App.vue";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
const options: VueQueryPluginOptions = { queryClient };

app.use(pinia);
app.use(VueQueryPlugin, options);
app.mount("#app");
