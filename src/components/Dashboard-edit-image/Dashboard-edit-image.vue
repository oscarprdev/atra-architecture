<script setup lang="ts">
import Loader from '../Loader/Loader.vue';
import { IconEdit } from '@tabler/icons-vue';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  isLoading: boolean;
  image: string;
  editDisabled: boolean;
  typeImg: 'about' | 'main' | 'list';
}>();

const prevImage = ref();
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

const handleEditImage = () => {
  if (uploadImage.value) {
    uploadImage.value.click();
  }
};

const handleInputImageChange = (e: Event) => {
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
  <div :class="`dashboard-image-container ${props.typeImg}`">
    <div v-if="props.isLoading" class="image-skeleton">
      <Loader />
    </div>
    <img v-if="!props.isLoading" :src="prevImage" alt="Project image" />
    <input
      class="input-image"
      type="file"
      ref="uploadImage"
      v-on:change="(e) => handleInputImageChange(e)"
    />
    <div
      v-if="!props.editDisabled"
      v-on:click="handleEditImage"
      class="edit-image-btn"
    >
      <IconEdit />
    </div>
  </div>
</template>

<style>
.dashboard-image-container {
  max-height: 15rem;
  align-self: center;
  position: relative;
}

.about {
  width: 65%;
  overflow: hidden;
}

.main {
  width: 50%;
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
</style>
