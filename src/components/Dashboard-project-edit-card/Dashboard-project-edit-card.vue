<script setup lang="ts">
import { IconX, IconCheck } from '@tabler/icons-vue';
import { ProjectDetail } from '../../core/types/data.types';

defineProps<{
  project: ProjectDetail;
}>();
const emit = defineEmits<{
  (e: 'onInputChange'): void;
  (e: 'onToggleSwitch'): void;
}>();
</script>

<template>
  <h3 class="form-card-title">Informacio del projecte</h3>
  <label>
    Nom
    <input id="name" :value="project.name" @change="emit('onInputChange')" />
  </label>
  <label>
    Any
    <input id="year" :value="project.year" @change="emit('onInputChange')" />
  </label>
  <label>
    Descripcio
    <input
      id="description"
      :value="project.description"
      @change="emit('onInputChange')"
    />
  </label>
  <label>
    Projecte destacat
    <div
      :class="`switch-container ${
        project.top ? 'switch-container--active' : ''
      }`"
      @click="emit('onToggleSwitch')"
    >
      <span :class="`switch ${project.top ? 'switch--active' : ''}`" />
      <template v-if="project.top">
        <IconCheck class="switch-icon switch-top" />
      </template>
      <template v-else>
        <IconX class="switch-icon" />
      </template>
    </div>
  </label>
</template>

<style scoped>
.form-card-title {
  color: rgb(27, 27, 27);
  font-weight: bold;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
}

.project-edit-images {
  width: 70%;
  height: 100%;
  border-radius: var(--dashboard-radius);
  border: 1px solid var(--border-admin);
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
  border-radius: var(--dashboard-radius);
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
}

.switch-container {
  width: 4rem;
  height: 2rem;
  background: linear-gradient(
    0deg,
    rgba(191, 191, 191, 1) 0%,
    rgba(94, 94, 94, 1) 100%
  );

  position: relative;
  padding: 0.1rem;
  border-radius: 5rem;
  cursor: pointer;
}

.switch-container--active {
  background: linear-gradient(
    0deg,
    rgba(255, 169, 84, 1) 0%,
    rgba(255, 119, 21, 1) 100%
  );
}
.switch {
  width: 1.7rem;
  height: 1.7rem;

  border-radius: 50%;

  position: absolute;
  top: 0.15rem;
  left: 0.17rem;
  background: linear-gradient(
    0deg,
    rgba(230, 230, 230, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  transition: 0.3s ease;
}

.switch--active {
  transform: translateX(1.9rem);
}

.switch-icon {
  position: absolute;
  right: 0.5rem;
  top: 0.3rem;
  color: white;
}

.switch-top {
  right: 2rem;
}
</style>
