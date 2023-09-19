<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { DefaultProjectsService } from '../../core/services/projects.service.ts';
import { Project } from '../../core/types/data.types';
import Modal from '../Modal/Modal.vue';
import DashboardProjectDetail from '../Dashboard-project-detail/Dashboard-project-detail.vue';
import Loader from '../Loader/Loader.vue';
import ModalContent from '../Modal-content/Modal-content.vue'

interface ModalState {
  isOpen: boolean;
  id: string;
  name: string;
}
const projects = ref<Project[]>();
const projectsLoading = ref(false);

const handleModal = (name: string) => {
  modalState.isOpen = true;
  modalState.id = `${name}-01`;
  modalState.name = name;
};

const modalState = reactive<ModalState>({
  isOpen: false,
  id: '',
  name: '',
});

const onProjectRemoved = (name: string) => {
  handleModal(name);
};

onMounted(async () => {
  projectsLoading.value = true;
  projects.value = await new DefaultProjectsService().getProjects();
  projectsLoading.value = false;
});
</script>

<template>
  <section class="dashboard-projects">
    <Loader v-if="projectsLoading">
      <template #text>
        <p>Carregant projectes</p>
      </template>
    </Loader>
    <article
      v-if="!projectsLoading"
      v-for="(project, index) in projects"
      :key="project.id"
      class="project-container"
    >
      <Dashboard-project-detail
        :project="project"
        :index="index"
        @on-project-removed="onProjectRemoved"
      />
    </article>
    <Modal
      v-if="modalState.isOpen"
      @closeModal="modalState.isOpen = false"
    >
    <ModalContent :project-name="modalState.name" :project-id="modalState.id" @on-close-modal="modalState.isOpen = false"/>
  </Modal>
  </section>
</template>

<style>
.dashboard-projects-title {
  text-align: center;
  width: 85vw;

  font-family: 'mona-sans' !important;
}

.dashboard-projects {
  display: grid;
  place-items: center;
  justify-self: center;
  width: 80vw;
  height: 100vh;
  background-color: rgb(250, 250, 250);
  box-shadow: 0 0 5px 5px rgba(201, 201, 201, 0.295);
  color: black;
  padding: 1.5rem 2rem;
  overflow-y: scroll;
  border-radius: var(--dashboard-radius);
}

.project-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid var(--border-admin);
}

.project-container:last-child {
  border-bottom: none;
}
</style>
