<script setup lang="ts">
import { ref } from 'vue';
import DashboardEditImage from '../Dashboard-edit-image/Dashboard-edit-image.vue';
import { IconPhotoPlus } from '@tabler/icons-vue';

const props = defineProps<{
  currentImages: string[];
  mainImage: string;
  isLoding: boolean;
}>();

const emit = defineEmits<{
  (e: 'onNewImageUploaded', image: File): void;
  (e: 'onRemoveCurrentImage', index: number): void;
  (e: 'onRetrieveMainImage', image: File): void;
}>();

const previewNewImages = ref<string[]>([]);
const uploadImage = ref<HTMLInputElement | null>(null);

const removeImageFromCurrentImages = (currentImage: string) => {
  const index = props.currentImages.findIndex((i) => i === currentImage);
  if (typeof index === 'number') {
    emit('onRemoveCurrentImage', index);
  }
};

const removeImageFromNewImages = (newImage: string) => {
  const index = previewNewImages.value?.findIndex((i) => i === newImage);
  if (typeof index === 'number') {
    previewNewImages.value?.splice(index, 1);
  }
};

const onRemoveImage = (e: Event, image: string) => {
  e.preventDefault();

  const currentImageToRemove = props.currentImages.find(
    (currentImage) => currentImage === image
  );
  const newImageToRemove = previewNewImages.value?.find(
    (previewImage) => previewImage === image
  );

  if (currentImageToRemove) {
    removeImageFromCurrentImages(currentImageToRemove);
  }

  if (newImageToRemove) {
    removeImageFromNewImages(newImageToRemove);
  }
};

const onRetrieveMainImage = (image: File) => emit('onRetrieveMainImage', image);

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

      emit('onNewImageUploaded', file);
    };
  }
};
</script>

<template>
  <section class="gallery-edit-images-card">
    <input
      type="file"
      ref="uploadImage"
      class="input-file"
      @change="onInputImageChange"
    />
    <button
      class="upload-image-btn"
      type="button"
      @click="onUploadProjectImage"
    >
      Carregar imatge <IconPhotoPlus />
    </button>
    <section class="project-gallery">
      <DashboardEditImage
        :is-loading="isLoding"
        :edit-disabled="false"
        :image="mainImage"
        @retrieve-image-file="onRetrieveMainImage"
        typeImg="main"
      />
      <article
        ref="projectImage"
        class="project-image-container"
        v-for="image in currentImages.concat(previewNewImages)"
      >
        <img
          :src="image"
          alt="project image"
          @click="(e) => onRemoveImage(e, image)"
        />
      </article>
    </section>
  </section>
</template>

<style scoped>
.gallery-edit-images-card {
  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;

  overflow: hidden;

  width: 70%;
  height: 100%;
  border-radius: var(--dashboard-radius);
  padding: 1rem;

  box-shadow: 0 0 3px 3px rgba(104, 104, 104, 0.082);
}

.upload-image-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;

  position: absolute;
  top: 1rem;
  right: 1.3rem;

  padding: 1rem 2.5rem;
  border-radius: var(--dashboard-radius);
  border: none;
  box-shadow: 0 0 3px 3px rgba(90, 90, 90, 0.11);
  color: white;

  background: linear-gradient(
    0deg,
    rgb(255, 179, 103) 0%,
    rgba(255, 119, 21, 1) 100%
  );

  cursor: pointer;
}

.upload-image-btn:hover {
  background: linear-gradient(
    0deg,
    rgb(255, 169, 82) 0%,
    rgb(255, 108, 2) 100%
  );
}
.project-gallery {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  width: 100%;

  gap: 0.3rem;
}

.input-file {
  display: none;
}

.project-image-container {
  box-shadow: var(--dashboard-gallery-image-shadow);

  border-radius: var(--dashboard-radius);
  height: 13vh;
  width: calc(var(--width-main-edit-image) / 2 - 0.15rem);
  overflow: hidden;

  animation: appearing 0.3s ease forwards;
}
</style>