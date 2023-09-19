<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const HeroAnimations = defineAsyncComponent(
  async () =>
    await import('../../components/Hero-animations/Hero-animations.vue')
);
const Hero = defineAsyncComponent(
  async () => await import('../../components/Hero/Hero.vue')
);
const Gallery = defineAsyncComponent(
  async () => await import('../../components/Gallery/Gallery.vue')
);
</script>

<template>
  <section class="screen">
    <HeroAnimations />
    <Hero />
    <Gallery />
  </section>
</template>
