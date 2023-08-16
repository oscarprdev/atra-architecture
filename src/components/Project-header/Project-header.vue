<script setup lang="ts">
import { type Project } from '../../core/types/data.type.ts';
import ProjectInfo from '../Project-info/Project-info.vue';

const props = defineProps<{
  project: Project;
}>();
</script>

<template>
  <header class="project-header">
    <div class="image-container">
      <img
        :src="props.project.mainImage"
        alt="image"
        loading="lazy"
        width="200"
        height="200"
      />
    </div>
    <ProjectInfo v-if="project" :project="project" />
  </header>
</template>

<style scoped>
.project-header {
  display: flex;
  align-items: center;

  height: 100vh;
}

.image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 50vw;
  height: 100vh;
  overflow: hidden;
}

@media screen and (max-width: 950px) {
  .project-header {
    flex-direction: column;
    height: 150vh;
  }
  .image-container {
    position: relative;
    width: 100vw;
    margin-top: -2rem;
  }
}

</style>
