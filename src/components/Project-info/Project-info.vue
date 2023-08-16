<script setup lang="ts">
import { type Project } from '../../core/types/data.type.ts';

const props = defineProps<{
  project: Project;
}>();
</script>

<template>
  <div class="project-info">
    <h1 class="project-title">{{ props.project.name }}</h1>
    <h2 class="project-year">{{ props.project.year }}</h2>
    <p class="project-description">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      commodo quis diam sit amet commodo. Nullam ut erat hendrerit, pretium
      turpis vitae, malesuada nisl. Mauris sodales convallis sapien, ut cursus
      libero rutrum ac. Nunc ex massa, ultrices quis erat at, convallis mollis
      tellus. Praesent in pellentesque enim. Etiam ipsum sem, interdum vitae
      odio a, rhoncus cursus arcu. Donec lacus leo, placerat a leo vel,
      tincidunt hendrerit leo. Donec fringilla, nisl sed condimentum convallis,
      purus velit mollis lectus, nec facilisis nunc nibh sed magna. Donec eget
      sem augue.
    </p>
  </div>
</template>

<style scoped>
.project-info {
  display: flex;
  flex-direction: column;
  width: 37vw;

  position: absolute;
  right: 10%;
  top: 10rem;
  opacity: 0;

  animation: appear-left 0.5s linear forwards;
}

.project-title {
  color: var(--dark);
  z-index: 1;
  font-size: clamp(2rem, 10vw, 5rem);
  text-transform: uppercase;
}

.project-year {
  color: var(--dark-opacity);
  margin-top: -3rem;
}

.project-description {
  max-width: 60ch;
}

@media screen and (max-width: 950px) {
  .project-info {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90vw;

    opacity: 0;
    animation: appear-left 0.5s linear forwards;
  }
}
</style>
