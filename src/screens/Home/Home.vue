<script setup lang="ts">
import Hero from "../../components/Hero/Hero.vue";
import HeroAnimations from "../../components/Hero-animations/Hero-animations.vue";
import Gallery from "../../components/Projects/Projects.vue";
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
