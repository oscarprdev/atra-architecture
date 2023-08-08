<script setup lang="ts">
import Hero from "../../components/Hero/Hero.vue";
import HeroAnimations from "../../components/Hero-animations/Hero-animations.vue";
import Gallery from "../../components/Gallery/Gallery.vue";
import Lazy from "../../components/Lazy/Lazy.vue";
</script>

<template>
  <section class="home">
    <HeroAnimations />
    <Hero />
    <Lazy>
      <Gallery />
    </Lazy>
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
