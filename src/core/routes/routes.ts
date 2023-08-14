import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../../screens/Home/Home.vue";
import About from "../../screens/About/About-screen.vue";
import Contact from "../../screens/Contact/Contact-screen.vue";
import Projects from "../../screens/Projects/Projects-screen.vue";
import Project from "../../screens/Project/Project-screen.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/projects",
    component: Projects,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/contact",
    component: Contact,
  },
  {
    path: "/projecte/:id",
    component: Project,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, _, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
        top: 0,
      };
    } else {
      return { left: 0, top: 0 };
    }
  },
});
