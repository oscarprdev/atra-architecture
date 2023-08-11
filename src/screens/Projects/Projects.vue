<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const Projects = defineAsyncComponent(
  () => import("../../components/Projects/Projects.vue"),
);
</script>

<template>
  <section class="projects">
    <Projects />
  </section>
</template>

<style scoped>
.projects {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80vw;
  background-color: var(--bg-gray);
}
</style>
