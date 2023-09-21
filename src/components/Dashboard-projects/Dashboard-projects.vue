<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { DefaultProjectsService } from '../../core/services/projects.service.ts';
import { Project } from '../../core/types/data.types';
import Modal from '../Modal/Modal.vue';
import DashboardProjectDetail from '../Dashboard-project-detail/Dashboard-project-detail.vue';
import Loader from '../Loader/Loader.vue';
import ModalRemoveProject from '../Modal-remove-project/Modal-remove-project.vue';
import Toast from '../Toast/Toast.vue';
import { useToast } from '../../core/composables/useToast';
import { useModals } from '../../core/composables/useModals';

const projects = ref<Project[]>();
const projectsLoading = ref(false);

const { toastState, manageToastState } = useToast();
const { modalState, openModal, isModalOpened, closeModal } = useModals();

const onOpenRemoveModal = ({ id, name }: { id: string; name: string }) => {
  openModal('remove-project', { id, projectName: name });
};
const onProjectRemoved = async () => {
  manageToastState(200, 'Projecte Eliminat', 'Error eliminant projecte');
  await updateProjectList();
};

const onUpdateProject = async () => {
  manageToastState(
    200,
    'Projectes actualitzats',
    'Error actualitzant projectes'
  );
  await updateProjectList();
};

const updateProjectList = async () => {
  projects.value = await new DefaultProjectsService().getProjects();
};

onMounted(async () => {
  projectsLoading.value = true;
  await updateProjectList();
  projectsLoading.value = false;
});
</script>

<template>
  <section class="dashboard-projects">
    <div class="loader-wrapper" v-if="projectsLoading">
      <Loader>
        <template #text>
          <p>Carregant projectes</p>
        </template>
      </Loader>
    </div>
    <article
      v-if="!projectsLoading"
      v-for="(project, index) in projects"
      :key="project.id"
      class="project-container"
    >
      <Dashboard-project-detail
        :project="project"
        :index="index"
        @on-open-remove-modal="onOpenRemoveModal"
        @on-project-update="onUpdateProject"
      />
    </article>
    <Modal v-if="isModalOpened()" @on-close-modal="closeModal()">
      <ModalRemoveProject
        v-if="isModalOpened('remove-project')"
        :project-name="modalState.removeModal.projectName"
        :project-id="modalState.removeModal.id"
        @on-close-modal="closeModal('remove-project')"
        @on-update-project-list="onProjectRemoved"
      />
    </Modal>
  </section>
  <Toast
    v-if="toastState.open"
    :content="toastState.content"
    :type="toastState.type"
  />
</template>

<style>
.dashboard-projects-title {
  text-align: center;
  width: 85vw;

  font-family: 'mona-sans' !important;
}

.loader-wrapper {
  display: grid;
  place-items: center;
  height: 10vh;
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
