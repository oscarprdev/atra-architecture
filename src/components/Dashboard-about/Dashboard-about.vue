<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import Button from '../Button/Button.vue';
import { DefaultAboutService } from '../../core/services/about-service';
import { DefaultAdminService } from '../../core/services/admin-service';
import { IconEdit } from '@tabler/icons-vue';
import Toast from '../Toast/Toast.vue';

interface About {
  image: string;
  text: string[];
}

const aboutInfoLoading = ref(false);
const uploadImage = ref<HTMLInputElement | null>(null);
const editDisabled = ref(true);
const uploadingInfo = ref(false);

const toastState = reactive<{
  open: boolean;
  type: 'success' | 'error';
  content: string;
}>({
  open: false,
  type: 'success',
  content: '',
});

const about = reactive<About>({
  image: '',
  text: ['...', '...', '...'],
});

const aboutImage = ref<File | null>(null);

const toggleEdit = () => {
  editDisabled.value = !editDisabled.value;
};

const handleEditImage = () => {
  if (uploadImage.value) {
    uploadImage.value.click();
  }
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

const handleUploadImageChange = (e: Event) => {
  const inputElement = e.target as HTMLInputElement;
  const file = inputElement.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      about.image = reader.result as string;
    };

    aboutImage.value = file;
  }
};

const handleAboutSubmit = async (e: Event) => {
  e.preventDefault();

  uploadingInfo.value = true;

  const aboutInput = {
    ...(aboutImage.value && { image: aboutImage.value as File }),
    text: about.text,
    project: 'about',
  };

  const { status } = await new DefaultAdminService().updateAboutInfo(
    aboutInput
  );

  if (status === 400) {
    const errorMessage =
      'Error actualitzant la informacio de la vista de qui som, proba en 1 minut o contacta amb servei tecnic';
    handleToast(errorMessage, 'error');

    return;
  }

  handleToast('Informacio personal actualitzada correctament', 'success');

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
    <div class="dashboard-image-container">
      <div v-if="aboutInfoLoading" class="image-skeleton">
        <span class="loader"></span>
      </div>
      <img
        v-if="!aboutInfoLoading"
        :src="about.image"
        alt="Image for about screen"
      />
      <input
        class="input-image"
        type="file"
        ref="uploadImage"
        v-on:change="handleUploadImageChange"
      />
      <div
        v-if="!editDisabled"
        v-on:click="handleEditImage"
        class="edit-image-btn"
      >
        <IconEdit />
      </div>
    </div>
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

.input-image {
  display: none;
}

.dashboard-about-form {
  margin-top: -1rem;
  justify-self: center;
  width: 60vw;
  padding: 1rem;

  background-color: var(--dark);
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  position: relative;
}

.dashboard-image-container {
  width: 65%;
  max-height: 15rem;
  align-self: center;
  position: relative;
  overflow: hidden;
}

.image-skeleton {
  width: 100%;
  height: 15rem;
  background-color: white;

  display: grid;
  place-items: center;
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

.edit-image-btn {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  max-width: 10rem;
  padding: 0.5rem;
  font-size: 0.7rem;
  cursor: pointer;
  transition: 0.5s ease;
  background-color: white;
  color: black;

  display: grid;
  place-items: center;
}

.edit-image-btn:hover {
  background-color: black;
  color: white;
}

.loader {
  width: 48px;
  height: 48px;
  border: 5px solid rgb(107, 107, 107);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
