<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { DefaultProjectsService } from '../../core/services/projects.service.ts';
import { Project } from '../../core/types/data.types';
import Button from '../Button/Button.vue';
import Loader from '../Loader/Loader.vue';

const projects = ref<Project[]>();
const projectsLoading = ref(false);

const emit = defineEmits<{
  handleModal: [id: string];
}>();

onMounted(async () => {
  projectsLoading.value = true;
  projects.value = await new DefaultProjectsService().getProjects();
  projectsLoading.value = false;
});
</script>

<template>
  <h2 class="dashboard-projects-title">Actualitzar projectes</h2>
  <section class="dashboard-projects">
    <Loader v-if="projectsLoading">
      <template #text>
        <p>Carregant projectes</p>
      </template>
    </Loader>
    <article
      v-if="!projectsLoading"
      v-for="(project, index) in projects"
      class="project-container"
    >
      <div class="project-info">
        <p>{{ index + 1 }}</p>
        <div class="image-container">
          <img :src="project.mainImage" alt="project image" />
        </div>
        <p>{{ project.name }}</p>
        <p>{{ project.year }}</p>
      </div>
      <Button
        class="project-btn"
        content="Editar projecte"
        type="button"
        v-on:click="emit('handleModal', project.id)"
      />
    </article>
  </section>
</template>

<style>
.dashboard-projects-title {
  text-align: center;
  width: 85vw;

  font-family:
    system-ui,
    -apple-system,
    Roboto !important;
}

.dashboard-projects {
  display: grid;
  place-items: center;
  gap: 1rem;
  justify-self: center;
  width: 80vw;
  height: 87vh;

  background-color: var(--dark);
  color: white;
  padding: 1.5rem 2rem;
  overflow-y: scroll;
}

.project-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 0.4rem 1rem;

  border-bottom: 1px solid var(--text-gray);
}

.project-container:last-child {
  border-bottom: none;
}

.project-info {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.image-container {
  width: 10rem;
  height: 5rem;
  border: 1px solid var(--text-gray);
}

.project-btn {
  width: 10rem !important;
  font-size: 0.8rem !important;
}
</style>
