<script setup lang="ts">
import Lazy from "../Lazy/Lazy.vue";
import { Project } from "../../core/types/data.type.ts";

const props = defineProps<{ projects: Project }>();
</script>

<template>
  <h1 class="projects-title">Projectes</h1>
  <div class="projects-container">
    <Lazy v-for="project in props.projects" :key="project.id">
      <RouterLink class="project-container" :to="`projecte/${project.id}`">
        <article class="image-container">
          <img
            :src="project.mainImage"
            alt="image"
            loading="lazy"
            width="200"
            height="200"
          />
        </article>
        <h2>{{ project.year + " " + project.name }}</h2>
      </RouterLink>
    </Lazy>
  </div>
</template>

<style scoped>
.projects-container {
  max-width: 90vw;
  padding: 2rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 1rem;
}

.projects-title {
  position: absolute;
  top: -1rem;
  left: 3rem;
  pointer-events: none;
  line-height: 1rem;

  color: #fff;
  text-align: center;

  opacity: 0;
  z-index: 1;
  font-size: clamp(2.5rem, 10vw, 8rem);
  text-transform: uppercase;

  animation: appear-left 0.5s linear forwards;
}

.project-container {
  z-index: 2;
  min-width: 20rem;
  height: 38vh;
  position: relative;
  cursor: pointer;

  opacity: 0;
  animation: appearing 0.3s ease-in-out forwards;
}

.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-container:after {
  box-shadow: inset 0 0 30px -59px #000000;
  content: "";
  display: block;
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
}

h2 {
  position: absolute;
  color: #fff;
  bottom: -1rem;
  left: 2rem;
  font-size: 1.8rem;
}

img {
  transition: all 0.5s ease;
}

.image-container:hover img {
  transform: scale(1.04);
}

h2:before {
  content: "";
  width: 8rem;
  height: 2px;
  background-color: #fff;
  position: absolute;
  bottom: -2px;
  left: 0;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s ease;
}

article:hover h2:before {
  transform: scaleX(1);
}

@media screen and (max-width: 1300px) {
  .projects-container {
    padding: 5rem 0;
  }

  .projects-title {
    top: 4rem;
    left: 1rem;
  }
}

@media screen and (max-width: 550px) {
  .projects-container {
    padding: 5rem 0;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }

  .projects-title {
    top: 5rem;
    left: 1rem;
  }
}
</style>
