<script setup lang="ts">
import Lazy from "../Lazy/Lazy.vue";
import { onMounted, Ref, ref } from "vue";
import { getProjectsData } from "../../core/services/data-service.ts";
import { Project } from "../../core/types/data.type.ts";

const projects: Ref<Project[] | []> = ref([]);

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
            <img
              :src="project.mainImage"
              alt="image"
              loading="lazy"
              width="200"
              height="200"
            />
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
  width: 100%;
}

.projects {
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
  font-size: clamp(4rem, 10vw, 8rem);
  text-transform: uppercase;

  animation: appear-left 0.5s linear forwards;
}

article {
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
  width: 100%;
  height: 100%;
  object-fit: cover;
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

@media screen and (max-width: 550px) {
  .projects {
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }

  .projects-title {
    top: 4rem;
    left: -1.6rem;
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
    transform: translateX(-2rem);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
