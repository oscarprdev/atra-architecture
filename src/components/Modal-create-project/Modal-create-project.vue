<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { ProjectDetail } from '../../core/types/data.types';
import CreateProjectForm from '../Modal-create-project-form/Modal-create-project-form.vue';
import CreateProjectImagesSection from '../Modal-create-project-images/Modal-create-project-images.vue';

interface CreateProjectFormState {
  name: string | null;
  year: string | null;
  mainImage: string | null;
  images: string[];
  description: string | null;
  top: boolean;
}

const imagesFiles = ref<File[]>([]);
const mainImageFile = ref<File>();
const projectState = reactive<CreateProjectFormState>({
  name: null,
  year: null,
  mainImage: null,
  images: [],
  description: null,
  top: false,
});

const emit = defineEmits<{
  (e: 'onCloseModal'): void;
}>();

const canCreateProject = computed(() => {
  return (
    !!projectState.name &&
    !!projectState.description &&
    !!projectState.year &&
    !!projectState.mainImage &&
    projectState.images.length > 0
  );
});

const onToggleSwitch = () => {
  projectState.top = !projectState.top;
};

const onInputChange = (e: Event): void => {
  e.preventDefault();

  const target = e.target as HTMLInputElement;
  const id = target.id as keyof ProjectDetail;

  switch (id) {
    case 'name':
      projectState.name = target.value;
      break;
    case 'year':
      projectState.year = target.value;
      break;
    case 'description':
      projectState.description = target.value;
      break;
    default:
      break;
  }
};

const addImageToGallery = (reader: FileReader, file: File) => {
  projectState.images?.unshift(reader.result as string);
  imagesFiles.value.unshift(file);
};

const setMainImage = (reader: FileReader, file: File) => {
  projectState.mainImage = reader.result as string;
  mainImageFile.value = file;
};

const readerFileController = (
  e: Event,
  fn: (reader: FileReader, file: File) => void
) => {
  const inputElement = e.target as HTMLInputElement;
  const file = inputElement.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      fn(reader, file);
    };
  }
};

const onInputMainImageChange = (e: Event) =>
  readerFileController(e, setMainImage);
const onInputImageChange = (e: Event) =>
  readerFileController(e, addImageToGallery);
</script>

<template>
  <section class="create-project-modal">
    <h2 class="create-project-modal-title">Crear un nou projecte</h2>
    <CreateProjectForm
      :name="projectState.name"
      :description="projectState.description"
      :year="projectState.year"
      :top="projectState.top"
      :can-create-project="canCreateProject"
      @on-close-modal="emit('onCloseModal')"
      @on-toggle-switch="onToggleSwitch"
      @on-input-change="onInputChange"
    />
    <CreateProjectImagesSection
      :images="projectState.images"
      :main-image="projectState.mainImage"
      @on-input-image-change="onInputImageChange"
      @on-input-main-image-change="onInputMainImageChange"
    />
  </section>
</template>

<style scoped>
.create-project-modal {
  display: flex;
  align-items: center;
  gap: 3rem;
  width: 70vw;
  height: 80vh;
  padding: 2rem;
}

.create-project-modal-title {
  position: absolute;
  top: 0;
  left: 1rem;
}
</style>
