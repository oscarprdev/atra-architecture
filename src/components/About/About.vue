<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import { getAboutData, getHomeData } from "../../core/services/data-service.ts";
import type { About, HomeData } from "../../core/types/data.type.ts";

const aboutData: Ref<About> = ref([]);
const personalInfo: Ref<HomeData> = ref();

onMounted(async () => {
  aboutData.value = await getAboutData();

  const home = await getHomeData();
  personalInfo.value = home.data;
});
</script>

<template>
  <figure class="about__image-container">
    <img :src="aboutData.mainImage" alt="about-image" />
    <h1>ATRArquitectura</h1>
  </figure>
  <div class="about__text">
    <p v-for="(text, index) in aboutData.description" :key="index">
      {{ text }}
    </p>
  </div>
</template>

<style scoped>
.about__image-container {
  position: relative;
  max-width: 90vw;

  display: grid;
  place-items: center;

  box-shadow: 0 0 25px -10px rgba(0, 0, 0, 1);
}

h1 {
  position: absolute;

  bottom: -6.5rem;
  left: 0;
  font-size: clamp(2.5rem, 6vw, 5rem);
  color: #fff;

  animation: fade-left ease-in-out 0.5s;
}

.about__text {
  padding: 0 0 1rem;
}

.about__text > p {
  max-width: 75ch;
  font-size: clamp(0.7rem, 5vw, 1.2rem);
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fade-left {
  0% {
    opacity: 0;
    transform: translateX(-1rem);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@media screen and (max-width: 1100px) {
  h1 {
    bottom: -5.5rem;
  }

  .about__text {
    width: 80vw;
  }
}

@media screen and (max-width: 830px) {
  h1 {
    bottom: -4.5rem;
  }
}

@media screen and (max-width: 650px) {
  h1 {
    bottom: -3.5rem;
  }
}

@media screen and (max-width: 550px) {
  .about__image-container {
    width: 100vw;
    height: 20vh;
  }

  h1 {
    bottom: -4.8rem;
  }
}
</style>
