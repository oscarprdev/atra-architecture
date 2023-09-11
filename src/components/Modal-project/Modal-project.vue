<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DefaultProjectsService } from '../../core/services/projects.service';
import { ProjectDetail } from '../../core/types/data.types';
import Button from '../Button/Button.vue';
import DashboardEditImage from '../Dashboard-edit-image/Dashboard-edit-image.vue';

const props = defineProps<{
  projectId: string;
}>();

const projectsLoading = ref(false);
const projectInfo = ref<ProjectDetail>();

const handleProjectSubmit = (e: Event) => {
  e.preventDefault();
};

onMounted(async () => {
  projectsLoading.value = true;

  projectInfo.value = await new DefaultProjectsService().getProjectById(
    props.projectId
  );

  projectsLoading.value = false;
});
</script>

<template>
  <form
    v-if="projectInfo"
    v-on:submit="handleProjectSubmit"
    class="form-container"
  >
    <label>
      Name
      <input :value="projectInfo.name" />
    </label>
    <label>
      Year
      <input :value="projectInfo.year" />
    </label>
    <label>
      Description
      <input :value="projectInfo.description" />
    </label>
    <DashboardEditImage
      :is-loading="projectsLoading"
      :edit-disabled="false"
      :image="projectInfo.mainImage"
      typeImg="main"
    />
    <label>
      Description
      <input :value="projectInfo.description" />
    </label>
    <label>
      Description
      <input :value="projectInfo.description" />
    </label>
    <label>
      Description
      <input :value="projectInfo.description" />
    </label>
    <Button class="modal-btn" content="Actualitzar projecte" type="submit" />
  </form>
</template>

<style scoped>
.form-container {
  width: 100%;
  height: 100%;
  overflow: scroll;

  display: flex;
  align-items: center;
  flex-direction: column;

  padding: 2rem;
  gap: 1rem;
}

.modal-btn {
  margin-top: 2rem;
  max-width: 60%;
}

label {
  width: 60%;
  color: black;
}

input {
  color: black;
  border: 1px solid var(--image-border-brown);
  caret-color: var(--dark);
}
</style>
