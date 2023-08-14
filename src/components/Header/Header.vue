<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

const route = useRoute();
const path = ref("");

watch(route, async (route) => {
  path.value = route.fullPath;
});
</script>

<template>
  <header>
    <ul>
      <li>
        <router-link v-if="path !== '/'" to="/">Inici</router-link>
      </li>
      <li>
        <router-link
          to="/projects"
          :class="`${path === '/projects' && 'active'}`"
          >Projectes</router-link
        >
      </li>
      <li>
        <router-link to="/about" :class="`${path === '/about' && 'active'}`"
          >Qui som</router-link
        >
      </li>
      <li>
        <router-link to="/contact" :class="`${path === '/contact' && 'active'}`"
          >Contacte</router-link
        >
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

  animation: fade-left 0.7s linear forwards;
}

h1 {
  font-family: vercetti;
  font-weight: lighter;
}

ul {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: clamp(1rem, 2vw, 2rem);
  width: 100%;
}

li {
  display: flex;
  flex-direction: column;
}

.active:before {
  content: "";
  width: 3rem;
  height: 2px;
  background-color: var(--dark);
  position: absolute;
  bottom: -5px;
  left: 0;
  transform: scaleX(1);
  transform-origin: left center;
  transition: transform 0.3s ease;
}

a {
  cursor: pointer;
  font-size: clamp(1rem, 5vw, 1.5rem);
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
</style>
