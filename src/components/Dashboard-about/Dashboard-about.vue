<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import Button from '../Button/Button.vue';
import { DefaultAboutService } from '../../core/services/about-service';
import { DefaultAdminService } from '../../core/services/admin-service';
import Toast, { ToastHandler } from '../Toast/Toast.vue';
import DashboardEditImage from '../Dashboard-edit-image/Dashboard-edit-image.vue';

interface About {
  image: string;
  text: string[];
}

const aboutInfoLoading = ref(false);
const editDisabled = ref(true);
const uploadingInfo = ref(false);
const aboutImageFile = ref<File | null>(null);

const toastState = reactive<ToastHandler>({
  open: false,
  type: 'success',
  content: '',
});
const about = reactive<About>({
  image: '',
  text: ['...', '...', '...'],
});

const toggleEdit = () => {
  editDisabled.value = !editDisabled.value;
};

const handleToast = (content: string, type: 'success' | 'error') => {
  toastState.open = true;
  toastState.content = content;
  toastState.type = type;
};

const handleTextareaInput = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  const textareaId = target?.id;
  const index = Number(textareaId.split('-')[1]);

  about.text[index] = target?.value;
};

const updateImageFile = (file: File) => {
  aboutImageFile.value = file;
};

const prepareAboutInput = () => {
  return {
    ...(aboutImageFile.value && { image: aboutImageFile.value as File }),
    text: about.text,
    project: 'about',
  };
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

const handleAboutSubmit = async (e: Event) => {
  e.preventDefault();

  uploadingInfo.value = true;

  const aboutInput = prepareAboutInput();

  const { status } = await new DefaultAdminService().updateAboutInfo(
    aboutInput
  );

  manageToastState(status);

  uploadingInfo.value = false;
};

onMounted(async () => {
  aboutInfoLoading.value = true;
  const aboutInfoResponse =
    await new DefaultAboutService().getAboutScreenInfo();

  about.image = aboutInfoResponse.image;
  about.text = aboutInfoResponse.text;

  aboutInfoLoading.value = false;
});
</script>

<template>
  <h2 class="dashboard-about-title">Actualitzar Descripcio</h2>
  <form class="dashboard-about-form" v-on:submit="handleAboutSubmit">
    <DashboardEditImage
      :edit-disabled="editDisabled"
      :image="about.image"
      :is-loading="aboutInfoLoading"
      typeImg="about"
      @retrieveImageFile="updateImageFile"
    />
    <label class="text-container" v-for="(text, index) in about.text">
      <p>{{ index + 1 }}</p>
      <textarea
        :id="`textarea-${index}`"
        :value="text"
        :disabled="editDisabled"
        v-on:input="handleTextareaInput"
      />
    </label>
    <Button
      v-if="!editDisabled"
      class="submit-btn"
      :content="`${uploadingInfo ? 'Actualitzant...' : 'Actualitzar'}`"
      type="submit"
    />
    <Button
      class="edit-about-btn"
      :content="`${editDisabled ? 'Editar' : 'No editar'}`"
      type="button"
      v-on:click="toggleEdit"
    />
  </form>
  <Toast
    v-if="toastState.open"
    :content="toastState.content"
    :type="toastState.type"
  />
</template>

<style>
.dashboard-about-title {
  text-align: center;
  width: 85vw;

  font-family:
    system-ui,
    -apple-system,
    Roboto !important;
}

.dashboard-about-form {
  margin-top: -1rem;
  justify-self: center;
  width: 60vw;
  max-width: 900px;

  background-color: var(--dark);
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  position: relative;
}

.text-container {
  display: flex;
  flex-direction: row;
}

textarea {
  padding: 1rem;
  width: 100%;
  height: 5rem;
  resize: none;
  background-color: transparent;
  border: 1px solid var(--text-gray);
  color: white;
}

textarea:disabled {
  border: none;
  padding: 1rem 0;
}

.submit-btn {
  max-width: 20rem;
}

.edit-about-btn {
  position: absolute !important;
  top: 1rem;
  right: 2rem;
  max-width: 8rem;
  font-size: 0.8rem;
  padding: 0.8rem 1rem !important;
}
</style>
