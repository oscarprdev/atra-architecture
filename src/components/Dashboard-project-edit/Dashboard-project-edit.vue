<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';

import Loader from '../Loader/Loader.vue';
import { ToastHandler } from '../Toast/Toast.vue';
import { IconCloudUpload } from '@tabler/icons-vue';
import { IconSquareRoundedX } from '@tabler/icons-vue';

import {
  DefaultAdminService,
  UpdateProjectInput,
} from '../../core/services/admin-service';
import { DefaultProjectsService } from '../../core/services/projects.service';

import { ProjectDetail } from '../../core/types/data.types';

import Button from '../Button/Button.vue';
import DashboardProjectGallery from '../Dashboard-project-gallery/Dashboard-project-gallery.vue';
import DashboardProjectEditCard from '../Dashboard-project-edit-card/Dashboard-project-edit-card.vue';

const props = defineProps<{
  projectId: string;
}>();

const emit = defineEmits<{
  (e: 'onProjectSubmitted'): void;
}>();

const projectsLoading = ref(false);
const projectInfo = ref<ProjectDetail>();

const newMainImage = ref<File | null>(null);
const newImages = ref<File[]>([]);
const toastState = reactive<ToastHandler>({
  open: false,
  type: 'success',
  content: '',
});

const generateProjectInput = (project: ProjectDetail): UpdateProjectInput => {
  return {
    name: project.name,
    description: project.description,
    year: Number(project.year),
    images: project.images,
    top: project.top,
    ...(newMainImage.value && { mainImage: newMainImage.value }),
    ...(newImages.value && { newImages: newImages.value }),
  };
};

const handleToast = (content: string, type: 'success' | 'error') => {
  toastState.open = true;
  toastState.content = content;
  toastState.type = type;
};

const manageToastState = (status: number) => {
  if (status === 400 || status === 500) {
    const errorMessage =
      'Error actualitzant la informacio de la vista de qui som, proba en 1 minut o contacta amb servei tecnic';
    handleToast(errorMessage, 'error');

    return;
  }

  handleToast('Informacio personal actualitzada correctament', 'success');
};

const onProjectSubmit = async (e: Event) => {
  e.preventDefault();

  if (projectInfo.value) {
    const projectInput: UpdateProjectInput = generateProjectInput(
      projectInfo.value
    );

    projectsLoading.value = true;

    const {
      projectResponse: { status },
    } = await new DefaultAdminService().updateProjectById(
      projectInput,
      props.projectId
    );

    projectsLoading.value = false;

    manageToastState(status);
    emit('onProjectSubmitted');
  }
};

const onInputChange = (e: Event): void => {
  e.preventDefault();

  const target = e.target as HTMLInputElement;
  const id = target.id as keyof ProjectDetail;

  if (projectInfo.value) {
    switch (id) {
      case 'name':
        projectInfo.value.name = target.value;
        break;
      case 'year':
        projectInfo.value.year = Number(target.value);
        break;
      case 'description':
        projectInfo.value.description = target.value;
        break;
      default:
        break;
    }
  }
};
const onToggleSwitch = () => {
  if (projectInfo.value) {
    projectInfo.value.top = !projectInfo.value.top;
  }
};
const onRetrieveMainImage = (image: File) => {
  newMainImage.value = image;
};
const onNewImageUploaded = (image: File) => {
  newImages.value.push(image);
};
const onRemoveCurrentImage = (index: number) => {
  projectInfo.value?.images.splice(index, 1);
};

onMounted(async () => {
  projectsLoading.value = true;

  projectInfo.value = await new DefaultProjectsService().getProjectById(
    props.projectId
  );

  projectsLoading.value = false;
});
</script>

<template>
  <div v-if="projectsLoading">
    <Loader />
  </div>
  <form
    v-if="projectInfo && !projectsLoading"
    @:submit="onProjectSubmit"
    class="form-container"
  >
    <DashboardProjectGallery
      v-if="projectInfo.images"
      :current-images="projectInfo.images"
      :main-image="projectInfo.mainImage"
      :is-loding="projectsLoading"
      @on-new-image-uploaded="onNewImageUploaded"
      @on-remove-current-image="onRemoveCurrentImage"
      @on-retrieve-main-image="onRetrieveMainImage"
    />
    <section class="project-edit-info">
      <div class="project-edit-info--form">
        <Dashboard-project-edit-card
          :project="projectInfo"
          @on-input-change="onInputChange"
          @on-toggle-switch="onToggleSwitch"
        />
      </div>
      <div class="buttons-wrapper">
        <button class="edit-btn edit-btn--remove">
          Eliminar <IconSquareRoundedX />
        </button>
        <button class="edit-btn edit-btn--update" type="submit">
          Actualitzar <IconCloudUpload />
        </button>
      </div>
    </section>
  </form>
</template>

<style scoped>
.form-container {
  width: 100%;
  height: 70vh;
  overflow: scroll;

  display: flex;
  align-items: start;

  padding: 2rem;
  gap: 1rem;

  position: absolute;
  top: 0;
  left: 0;

  overflow: hidden;
}

.project-edit-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  width: 30%;
  height: 100%;
  border-radius: var(--dashboard-radius);
  padding: 1rem;

  box-shadow: 0 0 3px 3px rgba(104, 104, 104, 0.082);
}

.project-edit-info--form {
  width: 100%;
  height: fit-content;
}

.buttons-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  gap: 2rem;
  height: fit-content;
}

.edit-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.8rem 1.7rem;
  border-radius: var(--dashboard-radius);
  border: none;
  box-shadow: 0 0 3px 3px rgba(90, 90, 90, 0.11);
  color: white;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;

  cursor: pointer;
}

.edit-btn--remove {
  background: linear-gradient(
    0deg,
    rgb(182, 182, 182) 0%,
    rgb(73, 73, 73) 100%
  );
}

.edit-btn--remove:hover {
  background: linear-gradient(
    0deg,
    rgb(160, 160, 160) 0%,
    rgb(68, 68, 68) 100%
  );
}

.edit-btn--update {
  background: linear-gradient(
    0deg,
    rgb(255, 179, 103) 0%,
    rgba(255, 119, 21, 1) 100%
  );
}

.edit-btn--update:hover {
  background: linear-gradient(
    0deg,
    rgb(255, 157, 60) 0%,
    rgb(255, 110, 6) 100%
  );
}
</style>
