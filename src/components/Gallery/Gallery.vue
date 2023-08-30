<script setup lang="ts">
import { type ProjectGallery } from '../../core/types/data.types.ts';
import { onMounted, type Ref, ref } from 'vue';
import GalleryImage from '../Gallery-image/Gallery-image.vue';
import { DefaultProjectsService } from '../../core/services/projects.service';

const projects: Ref<ProjectGallery[] | []> = ref([]);

onMounted(async () => {
  projects.value = await new DefaultProjectsService().getProjectsGallery();
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
  padding: 3rem 0 3rem;
  width: 100vw;
  height: fit-content;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.gallery-title {
  pointer-events: none;
  line-height: 1rem;

  color: var(--dark);
  text-align: center;

  z-index: 3;
  font-size: clamp(3rem, 10vw, 8rem);
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
    height: 17rem;
  }

  .gallery {
    width: 90vw;
  }

  .gallery-container {
    padding: 5rem 0 3rem;
  }

  .box-0 {
    height: 17rem;
  }
}
</style>
