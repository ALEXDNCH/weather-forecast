import { createRouter, createWebHistory } from "vue-router";
import { PAGES } from "./pages";

export const routes = Object.entries(PAGES).map(([name, page]) => ({
  name,
  path: page.path,
  component: page.component,
  label: page.label,
}));

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0, behavior: "smooth" };
  },
});
