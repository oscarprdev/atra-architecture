<script setup lang="ts">
import Loader from '../Loader/Loader.vue';
import { onMounted, ref, watch } from 'vue';
import { IconPhotoEdit } from '@tabler/icons-vue';

const props = defineProps<{
  isLoading: boolean;
  image: string;
  editDisabled: boolean;
  typeImg: 'about' | 'main' | 'list';
}>();

const prevImage = ref<string | null>();
const uploadImage = ref<HTMLInputElement | null>(null);

const emit = defineEmits<{
  retrieveImageFile: [file: File];
}>();

watch(
  () => props.image,
  (image) => {
    prevImage.value = image;
  }
);

const onEditImage = (e: Event) => {
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
      prevImage.value = reader.result as string;
    };

    emit('retrieveImageFile', file);
  }
};

onMounted(() => {
  prevImage.value = props.image;
});
</script>

<template>
  <article :class="`dashboard-image-container ${props.typeImg}`">
    <div v-if="props.isLoading" class="image-skeleton">
      <Loader />
    </div>
    <img
      v-if="!props.isLoading && prevImage"
      :src="prevImage"
      alt="Project image"
    />
    <input
      class="input-image"
      type="file"
      ref="uploadImage"
      v-on:change="(e) => onInputImageChange(e)"
    />
    <button
      v-if="!props.editDisabled"
      v-on:click="(e) => onEditImage(e)"
      class="edit-image-btn"
    >
      <IconPhotoEdit />
    </button>
  </article>
</template>

<style>
.dashboard-image-container {
  align-self: center;
  position: relative;
}

.about {
  width: 65%;
  overflow: hidden;
}

.main {
  width: var(--width-main-edit-image);
  height: 30vh;
  overflow: hidden;
  border-radius: var(--dashboard-radius);

  box-shadow: var(--dashboard-gallery-image-shadow);
}

.image-skeleton {
  width: 100%;
  height: 15rem;
  border: 1px solid white;

  display: grid;
  place-items: center;
}

.input-image {
  display: none;
}

.edit-image-btn {
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.4rem;
  border-radius: 2rem;
  border: none;
  box-shadow: 0 0 3px 3px rgba(90, 90, 90, 0.11);
  color: white;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;

  cursor: pointer;

  background: linear-gradient(
    0deg,
    rgb(255, 157, 60) 0%,
    rgb(255, 110, 6) 100%
  );
}
</style>
