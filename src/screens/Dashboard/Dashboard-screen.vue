<script setup lang="ts">
import Dashboard from '../../components/Dashboard/Dashboard.vue';
import Modal from '../../components/Modal/Modal.vue';
import { reactive } from 'vue';

interface ModalState {
  isOpen: boolean;
  id: string;
}

const modalState = reactive<ModalState>({
  isOpen: false,
  id: '',
});

const handleModal = (id: string) => {
  modalState.isOpen = true;
  modalState.id = id;
};
</script>

<template>
  <section class="dashboard-view">
    <Dashboard @handleModal="handleModal" />
    <Modal
      v-if="modalState.isOpen"
      :projectId="modalState.id"
      @closeModal="modalState.isOpen = false"
    />
  </section>
</template>

<style>
.dashboard-view {
  width: 100vw;
  display: flex;
  position: relative;
}
</style>
