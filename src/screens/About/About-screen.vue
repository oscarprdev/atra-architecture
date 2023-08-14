<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const About = defineAsyncComponent(
  () => import("../../components/About/About.vue"),
);
</script>

<template>
  <section class="screen about-screen">
    <About />
  </section>
</template>

<style>
.about-screen {
  padding: 6rem 2rem;
  animation: fade-in 0.5s ease;
}
</style>
