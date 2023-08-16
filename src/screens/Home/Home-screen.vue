<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { type Home } from '../../core/types/data.type';
import { getHomeData } from '../../core/services/data-service';

const HeroAnimations = defineAsyncComponent(
  async () => await import('../../components/Hero-animations/Hero-animations.vue')
);
const Hero = defineAsyncComponent(
  async () => await import('../../components/Hero/Hero.vue')
);
const Gallery = defineAsyncComponent(
  async () => await import('../../components/Gallery/Gallery.vue')
);

const homeInfo = ref<Home>();

onMounted(async () => {
  homeInfo.value = await getHomeData();
});
</script>

<template>
  <section class="screen">
    <HeroAnimations />
    <Hero v-if="homeInfo" :homeInfo="homeInfo" />
    <Gallery />
  </section>
</template>
