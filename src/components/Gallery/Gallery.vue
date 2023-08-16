<script setup lang="ts">
import { Project } from "../../core/types/data.type.ts";
import { onMounted, Ref, ref } from "vue";
import { getProjectsData } from "../../core/services/data-service.ts";
import GalleryImage from "../Gallery-image/Gallery-image.vue";

const projects: Ref<Project[] | []> = ref([]);

onMounted(async () => {
  const allProjects = await getProjectsData();

  projects.value = allProjects.filter((project) => project.top);
});
</script>

<template>
  <section class="gallery-container">
    <h1 class="gallery-title">Destacats</h1>
    <div class="gallery" v-if="projects">
      <article
        v-for="(project, index) in projects"
        :key="project.id"
        :class="`box-${index}`"
      >
        <GalleryImage :project="project" />
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

@media screen and (max-width: 1000px) {
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
    padding: 5rem 0 3rem;
  }

  .box-0 {
    height: 13rem;
  }
}
</style>
