<script setup lang="ts">
import { reactive } from 'vue';
import { ProjectDetail } from '../../core/types/data.types';
import Switch from '../Switch/Switch.vue';
import { IconCloudUpload } from '@tabler/icons-vue';
import { IconSquareRoundedX } from '@tabler/icons-vue';

interface CreateProjectFormState {
  id: string | null;
  name: string | null;
  year: string | null;
  mainImage: string | null;
  images: string[] | null;
  description: string | null;
  top: boolean;
}

const projectState = reactive<CreateProjectFormState>({
  id: null,
  name: null,
  year: null,
  mainImage: null,
  images: null,
  description: null,
  top: false,
});

const emit = defineEmits<{
  (e: 'onCloseModal'): void;
}>();

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
</script>

<template>
  <section class="create-project-modal">
    <h2 class="create-project-modal-title">Crear un nou projecte</h2>
    <form class="form-container">
      <label>
        Nom
        <input id="name" :value="projectState.name" @input="onInputChange" />
      </label>
      <label>
        Any
        <input id="year" :value="projectState.year" @input="onInputChange" />
      </label>
      <label>
        Descripcio
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
        >
          Crear projecte <IconCloudUpload />
        </button>
      </div>
    </form>
    <div class="images-section">
      <figure class="main-image-wrapper">
        <img v-if="projectState.mainImage" :src="projectState.mainImage" />
        <span v-else class="default-image"></span>
      </figure>
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

.form-container {
  margin-top: 3rem;
  width: 37%;
  height: 100%;
}

.images-section {
  width: 63%;
  height: 100%;
  padding: 1rem;
}

label {
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

.main-image-wrapper {
  display: grid;
  place-items: center;
  width: 60%;
  height: 40%;
}

.default-image {
  width: 100%;
  height: 100%;
  border: 1px dashed orangered;
  border-radius: 2rem;
}

.buttons-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  width: 100%;
  margin-top: 1rem;
  gap: 2rem;
  height: fit-content;
}

.create-project-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 1rem 2rem;

  border-radius: var(--border-radius-btn);
  border: none;
  box-shadow: var(--shadow-btn);
  color: white;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;

  cursor: pointer;
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
