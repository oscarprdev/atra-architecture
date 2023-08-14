<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { getProjectById } from "../../core/services/data-service.ts";
import { Project } from "../../core/types/data.type.ts";
import ProjectHeader from "../Project-header/Project-header.vue";
import ProjectGallery from "../Project-gallery/Project-gallery.vue";

const route = useRoute();
const project = ref<Project>();

onMounted(async () => {
  project.value = await getProjectById(route.params.id);
});
</script>

<template>
  <article class="project-container" v-if="project">
    <ProjectHeader v-if="project" :project="project" />
    <ProjectGallery v-if="project" :project="project" />
  </article>
</template>

<style scoped>
.project-container {
  width: 100vw;
  padding: 2rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
