<script setup lang="ts">
import { Project } from "../../core/types/data.type.ts";
import { onMounted, Ref, ref } from "vue";
import { getProjectsData } from "../../core/services/data-service.ts";
import Lazy from "../Lazy/Lazy.vue";

const projects: Ref<Project[] | []> = ref([]);

onMounted(async () => {
  const allProjects = await getProjectsData();

  projects.value = allProjects.filter((project) => project.top);
});
</script>

<template>
  <section class="gallery-container">
    <h1 class="gallery-title">Destacats</h1>
    <div class="gallery">
      <article
        v-for="(project, index) in projects"
        :key="project.id"
        :class="`box-${index}`"
      >
        <Lazy class="image-container">
          <img
            :src="project.mainImage"
            alt="image"
            loading="lazy"
            width="200"
            height="200"
            :class="`image-${index}`"
          />
          <div class="image-backdrop">
            <h2>{{ project.year + " " + project.name }}</h2>
          </div>
        </Lazy>
      </article>
    </div>
  </section>
</template>

<style scoped>
.gallery-container {
  position: relative;
  padding: 10rem 0 3rem;
  width: 100vw;
  height: fit-content;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.gallery-title {
  position: absolute;
  top: 2rem;
  left: 14rem;
  pointer-events: none;
  line-height: 1rem;

  color: #fff;
  text-align: center;

  z-index: 3;
  font-size: clamp(2rem, 10vw, 8rem);
  text-transform: uppercase;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  z-index: 2;
  gap: 1rem;
  width: 80vw;
}

article {
  height: 22rem;
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  cursor: pointer;
}

.image-backdrop {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: var(--dark-opacity);
  transition: opacity 0.6s ease;
}

h2 {
  z-index: 4;
  position: absolute;
  bottom: 0;
  left: 2rem;
  font-size: clamp(1rem, 5vw, 2rem);
  text-underline-offset: 10px;
  text-decoration: 2px underline;
  color: #fff;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.image-container:hover .image-backdrop,
.image-container:hover .image-backdrop h2 {
  opacity: 1;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.box-0 {
  grid-area: 1 / 1 / 3 / 3;
  height: 100%;
}
.box-1 {
  grid-area: 1 / 3 / 2 / 6;
}
.box-2 {
  grid-area: 2 / 3 / 3 / 6;
}
.box-3 {
  grid-area: 3 / 1 / 4 / 6;
}
.box-4 {
  grid-area: 4 / 1 / 5 / 4;
}
.box-5 {
  grid-area: 4 / 4 / 5 / 6;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes appearing {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.3;
  }
}

@media screen and (max-width: 550px) {
  .gallery {
    display: flex;
    flex-direction: column;
  }

  article {
    height: 12rem;
  }

  .gallery-title {
    top: -1rem;
    left: 5.5rem;
  }

  .gallery-container {
    padding: 2rem 0 3rem;
  }
  .image-container .image-backdrop {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.14);
  }

  .image-container .image-backdrop h2 {
    opacity: 1;
    left: 1rem;
  }

  .box-0 {
    height: 13rem;
  }
}
</style>
