<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const About = defineAsyncComponent(
  async () => await import('../../components/About/About.vue')
);
</script>

<template>
  <section class="screen about-screen">
    <About />
  </section>
</template>

<style>
.about-screen {
  padding: 4rem 2rem;
  animation: fade-in 0.5s ease;
  gap: 2rem;
}
</style>
