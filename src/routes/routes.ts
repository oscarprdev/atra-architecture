import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../screens/Home/Home.vue";
import About from "../screens/About/About.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
