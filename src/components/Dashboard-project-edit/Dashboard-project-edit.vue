<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Loader from '../Loader/Loader.vue';
import { IconCloudUpload } from '@tabler/icons-vue';
import { IconSquareRoundedX } from '@tabler/icons-vue';
import { DefaultAdminService } from '../../core/services/admin-service';
import { DefaultProjectsService } from '../../core/services/projects.service';
import { ProjectDetail } from '../../core/types/data.types';
import DashboardProjectGallery from '../Dashboard-project-gallery/Dashboard-project-gallery.vue';
import DashboardProjectEditCard from '../Dashboard-project-edit-card/Dashboard-project-edit-card.vue';
import { UpdateProjectFormData } from '../../core/types/admin.types';

export interface OnOpenRemoveModalinput {
  id: string;
  name: string;
}

const props = defineProps<{
  projectId: string;
}>();

const emit = defineEmits<{
  (e: 'onOpenRemoveModal', input: OnOpenRemoveModalinput): void;
  (e: 'onProjectUpdate', status: number): void;
}>();

const projectsLoading = ref(false);
const projectInfo = ref<ProjectDetail>();

const newMainImage = ref<File | null>(null);
const newImages = ref<File[]>([]);

const generateProjectInput = (
  project: ProjectDetail
): UpdateProjectFormData => {
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

const onProjectSubmit = async (e: Event) => {
  e.preventDefault();

  if (projectInfo.value) {
    const projectInput: UpdateProjectFormData = generateProjectInput(
      projectInfo.value
    );

    projectsLoading.value = true;

    const response = await new DefaultAdminService().updateProjectById({
      project: projectInput,
      id: props.projectId,
    });

    projectsLoading.value = false;

    emit('onProjectUpdate', response.status);
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
const onOpenRemoveModal = (e: Event) => {
  e.preventDefault();
  if (projectInfo.value) {
    emit('onOpenRemoveModal', {
      id: props.projectId,
      name: projectInfo.value?.name,
    });
  }
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
  <div class="loader-wrapper" v-if="projectsLoading">
    <Loader />
  </div>
  <form
    v-else-if="projectInfo && !projectsLoading"
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
        <button class="edit-btn edit-btn--remove" @click="onOpenRemoveModal">
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
  height: 80vh;
  overflow: scroll;

  display: flex;
  align-items: start;

  padding: 1rem;
  gap: 1rem;

  position: absolute;
  top: 0;
  left: 0;

  overflow: hidden;
}

.loader-wrapper {
  display: grid;
  place-items: center;
  height: 80vh;
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
  padding: 1rem 0;
  width: 100%;
  gap: 1rem;
  height: fit-content;
}

.edit-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.8rem 1.2rem;

  border-radius: var(--border-radius-btn);
  border: none;
  box-shadow: var(--shadow-btn);
  color: white;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;

  cursor: pointer;
}

.edit-btn--remove {
  background: var(--dark-bg-btn);
}

.edit-btn--remove:hover {
  background: var(--dark-hover-bg-btn);
}

.edit-btn--update {
  background: var(--colorful-bg-btn);
}

.edit-btn--update:hover {
  background: var(--colorful-hover-bg-btn);
}
</style>
