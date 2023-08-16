<script setup lang="ts">
import { type Project } from '../../core/types/data.type.ts';

const props = defineProps<{
  project: Project;
}>();
</script>

<template>
  <section class="project-gallery">
    <article
      :class="`image-${index}`"
      v-for="(image, index) in props.project.images"
      :key="index"
    >
      <img :src="image" alt="image" loading="lazy" width="200" height="200" />
    </article>
  </section>
</template>

<style scoped>
.project-gallery {
  width: 80vw;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

.image-0 {
  padding: 0.5rem;
  height: 30rem;
  grid-area: 1 / 1 / 2 / 9;
}

.image-1 {
  padding: 0.5rem;
  grid-area: 2 / 1 / 3 / 3;
}

.image-2 {
  padding: 0.5rem;
  grid-area: 2 / 3 / 3 / 5;
}

.image-3 {
  padding: 0.5rem;
  grid-area: 2 / 5 / 3 / 7;
}
</style>
