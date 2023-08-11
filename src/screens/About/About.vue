<script setup lang="ts">
import {defineAsyncComponent} from "vue";

const About = defineAsyncComponent(
    () => import("../../components/About/About.vue"),
);
</script>

<template>
  <section class="about">
    <About />
  </section>
</template>

<style>
.about {
  width: 100vw;
  height: fit-content;
  background-color: var(--bg-gray);

  padding: 6rem 2rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  animation: fade-in 0.5s ease;
}
</style>
