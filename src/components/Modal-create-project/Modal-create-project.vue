<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { ProjectDetail } from '../../core/types/data.types';
import Switch from '../Switch/Switch.vue';
import { IconCloudUpload } from '@tabler/icons-vue';
import { IconSquareRoundedX } from '@tabler/icons-vue';
import { IconPhotoPlus } from '@tabler/icons-vue';
import { IconCheck } from '@tabler/icons-vue';

interface CreateProjectFormState {
  name: string | null;
  year: string | null;
  mainImage: string | null;
  images: string[];
  description: string | null;
  top: boolean;
}

const uploadImage = ref<HTMLInputElement | null>(null);
const imagesFiles = ref<File[]>([]);

const uploadMainImage = ref<HTMLInputElement | null>(null);
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
    projectState.name &&
    projectState.description &&
    projectState.year &&
    projectState.mainImage &&
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
const onUploadMainImage = (e: Event) => {
  e.preventDefault();
  if (uploadMainImage.value) {
    uploadMainImage.value.click();
  }
};
const onInputMainImageChange = (e: Event) => {
  const inputElement = e.target as HTMLInputElement;
  const file = inputElement.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      projectState.mainImage = reader.result as string;
      mainImageFile.value = file;
    };
  }
};

const onUploadImage = (e: Event) => {
  e.preventDefault();
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
      projectState.images?.unshift(reader.result as string);
      imagesFiles.value.unshift(file);
    };
  }
};
</script>

<template>
  <section class="create-project-modal">
    <h2 class="create-project-modal-title">Crear un nou projecte</h2>
    <form class="form-container">
      <label>
        <div class="input-title">
          Nom
          <p class="input-error" v-if="!projectState.name">
            * El nom del projecte es requerit
          </p>
          <IconCheck class="icon-check" v-else :size="17" />
        </div>

        <input id="name" :value="projectState.name" @input="onInputChange" />
      </label>
      <label>
        <div class="input-title">
          Any
          <p class="input-error" v-if="!projectState.year">
            * El any del projecte es requerit
          </p>
          <p class="input-error" v-else-if="!Number(projectState.year)">
            * El valor del any deu ser un numero
          </p>
          <p class="input-error" v-else-if="Number(projectState.year) < 1980">
            * El valor del any deu ser mes gran que 1980
          </p>
          <p
            class="input-error"
            v-else-if="Number(projectState.year) > new Date().getFullYear() + 1"
          >
            {{
              `El valor del any deu ser menor que ${
                new Date().getFullYear() + 1
              }`
            }}
          </p>
          <IconCheck class="icon-check" v-else :size="17" />
        </div>

        <input id="year" :value="projectState.year" @input="onInputChange" />
      </label>
      <label>
        <div class="input-title">
          Descripcio
          <p class="input-error" v-if="!projectState.description">
            * La descripcio del projecte es requerida
          </p>
          <IconCheck class="icon-check" v-else :size="17" />
        </div>

        <input
          id="description"
          :value="projectState.description"
          @input="onInputChange"
        />
      </label>
      <label>
        Es un projecte destacat?
        <Switch :top="projectState.top" @on-toggle-switch="onToggleSwitch" />
      </label>
      <div class="buttons-wrapper">
        <button
          class="create-project-btn create-project-btn--cancel"
          @click="emit('onCloseModal')"
        >
          Cancelar <IconSquareRoundedX />
        </button>
        <button
          class="create-project-btn create-project-btn--create"
          type="submit"
          :disabled="!canCreateProject"
        >
          Crear projecte <IconCloudUpload />
        </button>
      </div>
    </form>
    <div class="images-section">
      <figure class="main-image-wrapper">
        <input
          class="input-image"
          type="file"
          ref="uploadMainImage"
          @change="onInputMainImageChange"
        />
        <p class="input-error main-image-error" v-if="!projectState.mainImage">
          * La imatge principal es requerida
        </p>
        <img
          v-if="projectState.mainImage"
          :src="projectState.mainImage"
          alt="project main image"
        />
        <button
          v-if="projectState.mainImage"
          @:click="onUploadMainImage"
          class="upload-image-btn main-btn"
        >
          <IconPhotoPlus />
        </button>
        <span v-else class="default-image">
          <div class="default-image-content">
            <p>Imatge principal</p>
            <button @:click="onUploadMainImage" class="upload-image-btn">
              <IconPhotoPlus />
            </button>
          </div>
        </span>
      </figure>
      <section v-if="projectState.images" class="images-list">
        <figure
          v-if="projectState.images.length > 0"
          v-for="image in projectState.images"
          class="image-wrapper"
        >
          <img :src="image" alt="project image" />
        </figure>
        <span v-if="projectState.images.length < 10" class="default-image-item">
          <p
            class="input-error image-error"
            v-if="projectState.images.length === 0"
          >
            * Minim una imatge es requerida
          </p>
          <input
            class="input-image"
            type="file"
            ref="uploadImage"
            @change="onInputImageChange" />
          <button @:click="onUploadImage" class="upload-image-btn">
            <IconPhotoPlus /></button
        ></span>
      </section>
    </div>
  </section>
</template>

<style scoped>
.create-project-modal-title {
  position: absolute;
  top: 0;
  left: 1rem;
}
.create-project-modal {
  display: flex;
  align-items: center;
  gap: 3rem;
  width: 70vw;
  height: 80vh;
  padding: 2rem;
}

.icon-check {
  animation: appearing 0.8s ease;
}

.form-container {
  margin-top: 3rem;
  width: 37%;
  height: 100%;
}

.images-section {
  width: 45%;
  height: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  position: relative;
  width: 100%;
  font-weight: bold;
  text-transform: capitalize;
  margin-top: 1rem;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
}

input {
  color: rgb(31, 31, 31);
  width: 100%;
  border: 1px solid var(--image-border-brown);
  caret-color: var(--dark);
  border-radius: var(--dashboard-items-radius);
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
}

.input-title {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.input-error {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.6rem;
  color: rgb(223, 0, 0);
  text-transform: none;
}

.main-image-error {
  right: 1rem;
}

.image-error {
  top: auto;
  left: 0;
  right: 0;
  bottom: -1.7rem;
  width: 10rem;
}

.input-image {
  display: none;
}

.main-image-wrapper {
  position: relative;
  display: grid;
  place-items: center;
  height: 40%;
  width: 85%;
  border-radius: 0.5rem;
  overflow: hidden;
}

.default-image {
  width: 100%;
  height: 100%;
  border: 1px dashed orangered;
  border-radius: 0.5rem;

  display: grid;
  place-items: center;

  transition: all 0.2s ease;
}

.default-image-item {
  position: relative;
  width: 30%;
  height: 25%;
  border: 1px dashed orangered;
  border-radius: 0.5rem;

  display: grid;
  place-items: center;

  transition: all 0.2s ease;
}

.image-wrapper {
  position: relative;
  width: 30%;
  height: 25%;
  overflow: hidden;
  margin: 0;
  border-radius: 0.5rem;
}

.main-btn {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}

.default-image:hover .default-image-item:hover {
  background-color: rgb(255, 247, 231);
}

.default-image-content {
  display: grid;
  place-items: center;
}

.upload-image-btn {
  display: grid;
  place-items: center;
  padding: 0.4rem;
  border-radius: var(--border-radius-btn);
  border: none;
  box-shadow: var(--shadow-btn);
  color: white;
  cursor: pointer;

  background: var(--colorful-bg-btn);
}

.images-list {
  position: relative;
  width: 100%;
  height: 60%;
  padding: 0 2rem;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 1rem;
}
.buttons-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  width: 100%;
  margin-top: 1rem;
  gap: 1.5rem;
  height: fit-content;
}

.create-project-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 1rem 1.8rem;

  border-radius: var(--border-radius-btn);
  border: none;
  box-shadow: var(--shadow-btn);
  color: white;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;

  cursor: pointer;
}

.create-project-btn[disabled] {
  background: rgb(225, 225, 225);
  box-shadow: none;
}

.create-project-btn[disabled]:hover {
  cursor: not-allowed;
  background: rgb(225, 225, 225);
  box-shadow: none;
}

.create-project-btn--cancel {
  background: var(--dark-bg-btn);
}

.create-project-btn--cancel:hover {
  background: var(--dark-hover-bg-btn);
}

.create-project-btn--create {
  background: var(--colorful-bg-btn);
}

.create-project-btn--create:hover {
  background: var(--colorful-hover-bg-btn);
}
</style>
