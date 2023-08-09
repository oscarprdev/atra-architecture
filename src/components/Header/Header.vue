<script setup lang="ts">
import { useRoute } from "vue-router";
import {ref, watch} from "vue";

const route = useRoute();
const path = ref('')

watch(
  route,
  async (route) => {
    path.value = route.fullPath
  },
);
</script>

<template>
  <header>
    <ul>
      <li>
        <router-link v-if="path !== '/'" to="/">Inici</router-link>
      </li>
      <li>
        <router-link to="/projects">Projectes</router-link>
      </li>
      <li>
        <router-link to="/about">Qui som</router-link>
      </li>
      <li>
        <router-link to="/contact">Contacte</router-link>
      </li>
    </ul>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  display: flex;
  align-items: center;
  width: 100vw;
  z-index: 3;
  padding: 1rem 5rem;

  opacity: 0;

  animation: fade-in 3s ease forwards;
}

h1 {
  font-family: vercetti;
  font-weight: lighter;
}

ul {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 2rem;
  width: 100%;
}

li {
  display: flex;
  flex-direction: column;
}

a {
  cursor: pointer;
  font-size: 1.5rem;
  position: relative;
  color: var(--dark);
}

a:before {
  content: "";
  width: 3rem;
  height: 2px;
  background-color: var(--dark);
  position: absolute;
  bottom: -5px;
  left: 0;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s ease;
}

a:hover:before {
  transform: scaleX(1);
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateX(4rem);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
