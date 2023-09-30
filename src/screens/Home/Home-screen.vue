<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { DefaultProjectsService } from '../../core/services/projects.service';
import { ProjectGallery } from '../../core/types/data.types';

// const HeroAnimations = defineAsyncComponent(
//   async () =>
//     await import('../../components/Hero-animations/Hero-animations.vue')
// );
const Hero = defineAsyncComponent(
  async () => await import('../../components/Hero/Hero.vue')
);
const Gallery = defineAsyncComponent(
  async () => await import('../../components/Gallery/Gallery.vue')
);

const projects = ref<ProjectGallery[]>([]);

onMounted(async () => {
  projects.value = await new DefaultProjectsService().getProjectsGallery();
});
</script>

<template>
  <section class="screen">
    <!-- <HeroAnimations /> -->
    <Hero />
    <Gallery />
  </section>
</template>
