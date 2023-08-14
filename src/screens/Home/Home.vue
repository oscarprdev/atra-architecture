<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from "vue";
import { Home } from "../../core/types/data.type.ts";
import { getHomeData } from "../../core/services/data-service.ts";

const HeroAnimations = defineAsyncComponent(
  () => import("../../components/Hero-animations/Hero-animations.vue"),
);
const Hero = defineAsyncComponent(
  () => import("../../components/Hero/Hero.vue"),
);
const Gallery = defineAsyncComponent(
  () => import("../../components/Gallery/Gallery.vue"),
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
