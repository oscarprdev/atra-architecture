<script setup lang="ts">
import Lazy from "../Lazy/Lazy.vue";
import { onMounted, ref } from "vue";
import { getProjectsData } from "../../core/services/data-service.ts";
import { Project } from "../../core/types/data.type.ts";

const projects: Project[] = ref([]);

onMounted(async () => {
  projects.value = await getProjectsData();
});
</script>

<template>
  <section class="projects-container">
    <h1 class="projects-title">Projectes</h1>
    <div class="projects">
      <Lazy v-for="project in projects" :key="project.id">
        <article>
          <div class="image-container">
            <img :src="project.mainImage" alt="image" />
          </div>
          <h2>{{ project.year + " " + project.name }}</h2>
        </article>
      </Lazy>
    </div>
  </section>
</template>

<style scoped>
.projects-container {
  position: relative;
  padding: 5rem 0 0;
  height: fit-content;
  max-width: 100vw;
}

.projects {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
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
  font-size: clamp(2rem, 10vw, 8rem);
  text-transform: uppercase;

  animation: appear-left 0.8s linear forwards;
}

article {
  z-index: 2;
  min-width: 20rem;
  height: 43vh;
  position: relative;
  cursor: pointer;

  opacity: 0;
  animation: appearing 0.5s ease-in-out forwards;
}

.image-container {
  width: 100%;
  height: 100%;

  overflow: hidden;
}

.image-container:after {
  box-shadow: inset 0 0 100px -5px #000000;
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

  text-decoration: underline 1px;
  text-underline-offset: 6px;

  font-size: 2.3rem;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.8s ease;
}

.image-container:hover img {
  transform: scale(1.05);
}

@media screen and (max-width: 550px) {
  .projects {
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }
}

@keyframes appearing {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes appear-left {
  0% {
    opacity: 0;
    transform: translateX(-6rem);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
