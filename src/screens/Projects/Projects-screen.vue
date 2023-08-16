<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref, type Ref } from 'vue';
import { type Project } from '../../core/types/data.type.ts';
import { getProjectsData } from '../../core/services/data-service.ts';

const Projects = defineAsyncComponent(
  async () => await import('../../components/Projects/Projects.vue')
);

const projects: Ref<Project[] | []> = ref([]);

onMounted(async () => {
  projects.value = await getProjectsData();
});
</script>

<template>
  <section class="screen projects-screen">
    <Projects v-if="projects" :projects="projects" />
  </section>
</template>

<style scoped>
.projects-screen {
  max-width: 100vw;
  padding: 5rem 0 0;
}
</style>
