<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  DefaultAdminService,
  UpdateProjectInput,
} from '../../core/services/admin-service';
import { DefaultProjectsService } from '../../core/services/projects.service';
import { ProjectDetail } from '../../core/types/data.types';
import Button from '../Button/Button.vue';
import DashboardEditImage from '../Dashboard-edit-image/Dashboard-edit-image.vue';

const props = defineProps<{
  projectId: string;
}>();

const projectsLoading = ref(false);
const projectInfo = ref<ProjectDetail>();

const newMainImage = ref<File | null>(null);
const newImages = ref<File[]>([]);

const previewNewImages = ref<string[]>([]);

const uploadImage = ref<HTMLInputElement | null>(null);

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

const onProjectSubmit = async (e: Event) => {
  e.preventDefault();

  if (projectInfo.value) {
    const projectInput: UpdateProjectInput = generateProjectInput(
      projectInfo.value
    );

    const response = await new DefaultAdminService().updateProjectById(
      projectInput,
      props.projectId
    );

    console.log(response);
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

// const onRemoveImage = (index: number) => {
//   projectInfo.value?.images.splice(index, 1);
// };

const onRetrieveMainImage = (file: File) => {
  newMainImage.value = file;

  console.log(newMainImage);
};

const onUploadProjectImage = () => {
  if (uploadImage.value) {
    uploadImage.value.click();
  }
};

const onInputImageChange = (e: Event) => {
  const inputElement = e.target as HTMLInputElement;
  const file = inputElement.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageUrl = reader.result as string;

      previewNewImages.value.push(imageUrl);
      newImages.value.push(file);
    };
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
  <form v-if="projectInfo" @:submit="onProjectSubmit" class="form-container">
    <label>
      Name
      <input id="name" :value="projectInfo.name" @change="onInputChange" />
    </label>
    <label>
      Year
      <input id="year" :value="projectInfo.year" @change="onInputChange" />
    </label>
    <label>
      Description
      <input
        id="description"
        :value="projectInfo.description"
        @change="onInputChange"
      /> </label
    >\
    <label>
      Projecte destacat
      <div class="switch-container">
        <span
          :class="`switch ${projectInfo.top ? 'switch--active' : ''}`"
          @click="onToggleSwitch"
        />
      </div>
    </label>
    <DashboardEditImage
      :is-loading="projectsLoading"
      :edit-disabled="false"
      :image="projectInfo.mainImage"
      @retrieve-image-file="onRetrieveMainImage"
      typeImg="main"
    />
    <label>
      Imatges
      <input
        type="file"
        ref="uploadImage"
        class="input-file"
        @change="onInputImageChange"
      />
      <button type="button" @click="onUploadProjectImage">
        Carregar imatge
      </button>
      <section class="project-gallery">
        <div
          class="project-image-container"
          v-for="image in projectInfo.images"
        >
          <img :src="image" alt="project image" />
        </div>
      </section>
    </label>
    <Button class="modal-btn" content="Actualitzar projecte" type="submit" />
  </form>
</template>

<style scoped>
.form-container {
  width: 100%;
  height: 100%;
  overflow: scroll;

  display: flex;
  align-items: center;
  flex-direction: column;

  padding: 2rem;
  gap: 1rem;
}

.modal-btn {
  margin-top: 2rem;
  max-width: 60%;
}

label {
  width: 60%;
  color: black;
}

input {
  color: black;
  border: 1px solid var(--image-border-brown);
  caret-color: var(--dark);
}

.switch-container {
  width: 5rem;
  height: 2rem;
  border: 1px solid black;

  position: relative;
  padding: 0.1rem;
}

.switch {
  width: 2rem;
  height: 1.8rem;

  position: absolute;
  top: 0.05rem;
  left: 0.05rem;
  background-color: black;
  transition: 0.3s ease;
}

.switch--active {
  transform: translateX(2.8rem);
}

.project-gallery {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 120%;

  gap: 0.5rem;
}

.input-file {
  display: none;
}

.project-image-container {
  width: 6rem;
  height: 6rem;
}
</style>
