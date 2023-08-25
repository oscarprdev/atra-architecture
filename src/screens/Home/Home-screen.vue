<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { type Home } from '../../core/types/data.types'
import { DefaultHomeService } from '../../core/services/home-service'

const HeroAnimations = defineAsyncComponent(
  async () =>
    await import('../../components/Hero-animations/Hero-animations.vue')
)
const Hero = defineAsyncComponent(
  async () => await import('../../components/Hero/Hero.vue')
)
const Gallery = defineAsyncComponent(
  async () => await import('../../components/Gallery/Gallery.vue')
)

const homeInfo = ref<Home>()

onMounted(async () => {
  homeInfo.value = await new DefaultHomeService().getHeroText()
})
</script>

<template>
  <section class="screen">
    <HeroAnimations />
    <Hero v-if="homeInfo" :homeInfo="homeInfo" />
    <Gallery />
  </section>
</template>
