<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { DefaultProjectsService } from '../../core/services/projects.service.ts';
import { Project } from '../../core/types/data.types';
import Modal from '../Modal/Modal.vue';
import DashboardProjectDetail from '../Dashboard-project-detail/Dashboard-project-detail.vue';
import Loader from '../Loader/Loader.vue';
import ModalRemoveProject from '../Modal-remove-project/Modal-remove-project.vue';
import Toast, { ToastHandler } from '../Toast/Toast.vue';

interface ModalState {
  isOpen: boolean;
  id: string;
  projectName: string;
}
const projects = ref<Project[]>();
const projectsLoading = ref(false);

const handleModal = (id: string, name: string) => {
  modalState.isOpen = true;
  modalState.id = id;
  modalState.projectName = name;
};

const modalState = reactive<ModalState>({
  isOpen: false,
  id: '',
  projectName: '',
});

const toastState = reactive<ToastHandler>({
  open: false,
  type: 'success',
  content: '',
});

const handleToast = (content: string, type: 'success' | 'error') => {
  toastState.open = true;
  toastState.content = content;
  toastState.type = type;

  setTimeout(() => {
    toastState.open = false;
  }, 2000);
};

const manageToastState = (status: number, text: string) => {
  if (status === 400 || status === 500) {
    const errorMessage =
      'Error actualitzant els projectes, proba en 1 minut o contacta amb servei tecnic';
    handleToast(errorMessage, 'error');

    return;
  }

  handleToast(text, 'success');
};

const onOpenRemoveModal = ({ id, name }: { id: string; name: string }) => {
  handleModal(id, name);
};
const onProjectRemoved = () => {
  manageToastState(200, 'Projecte Eliminat');
  updateProjectList();
};

const onUpdateProject = () => {
  manageToastState(200, 'Projectes actualitzats');
  updateProjectList();
};

const updateProjectList = async () => {
  projects.value = await new DefaultProjectsService().getProjects();
};

onMounted(async () => {
  projectsLoading.value = true;
  updateProjectList();
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
        @on-open-remove-modal="onOpenRemoveModal"
        @on-project-update="onUpdateProject"
      />
    </article>
    <Modal
      v-if="modalState.isOpen"
      @closeModal="modalState.isOpen = false"
      @on-close-modal="modalState.isOpen = false"
    >
      <ModalRemoveProject
        :project-name="modalState.projectName"
        :project-id="modalState.id"
        @on-close-modal="modalState.isOpen = false"
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
