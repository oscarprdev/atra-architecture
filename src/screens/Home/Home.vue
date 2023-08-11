<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const HeroAnimations = defineAsyncComponent(
  () => import("../../components/Hero-animations/Hero-animations.vue"),
);
const Hero = defineAsyncComponent(
  () => import("../../components/Hero/Hero.vue"),
);
const Gallery = defineAsyncComponent(
  () => import("../../components/Gallery/Gallery.vue"),
);
</script>

<template>
  <section class="home">
    <HeroAnimations />
    <Hero />
    <Gallery />
  </section>
</template>

<style scoped>
.home {
  background-color: var(--bg-gray);
  position: relative;
  overflow: hidden;
  z-index: 0;
}
</style>
