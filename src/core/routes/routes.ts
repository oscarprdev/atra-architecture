import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../../screens/Home/Home.vue";
import About from "../../screens/About/About.vue";
import Contact from "../../screens/Contact/Contact.vue";
import Projects from "../../screens/Projects/Projects.vue";

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
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
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
