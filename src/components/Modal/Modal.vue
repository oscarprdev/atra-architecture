<script setup lang="ts">
import { IconX } from '@tabler/icons-vue';
import ModalProject from '../Modal-project/Modal-project.vue';

const props = defineProps<{
  projectId: string;
}>();

const emit = defineEmits<{
  closeModal: [];
}>();
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <IconX class="close-icon" v-on:click="emit('closeModal')" />
      <ModalProject :projectId="props.projectId" />
    </div>
  </div>
</template>

<style>
.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(58, 58, 58, 0.3);

  display: grid;
  place-items: center;
  z-index: 10;

  backdrop-filter: blur(3px);
}

.modal {
  width: 50vw;
  height: 80vh;

  max-width: 800px;
  max-height: 1000px;
  background-color: white;
  display: grid;
  place-items: center;

  position: relative;
  overflow: hidden;
}

.close-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  color: black;
}
</style>
