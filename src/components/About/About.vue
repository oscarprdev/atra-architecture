<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import { getAboutData, getHomeData } from "../../core/services/data-service.ts";
import type { About, HomeData } from "../../core/types/data.type.ts";
import Map from "../Map/Map.vue";

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
    <article class="contact" v-if="personalInfo">
      <div>
        <h2>{{ personalInfo.name }}</h2>
        <h3>{{ personalInfo.phone }}</h3>
        <h3>{{ personalInfo.email }}</h3>
        <h3 class="direction">{{ personalInfo.direction }}</h3>
      </div>
      <Map />
    </article>
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
  padding: 0 0 2rem;
  border-bottom: 1px solid #fff;
}

.about__text > p {
  max-width: 75ch;
  font-size: clamp(0.7rem, 5vw, 1.2rem);
}

.contact {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  gap: 2rem;
  justify-content: center;

}

.contact h2,
.contact h3 {
  font-size: clamp(0.5rem, 4vw, 1.2rem);
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
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

@media screen and (max-width: 550px) {
  .about__image-container  {
    width: 100vw;
    height: 20vh;
  }

  h1 {
    bottom: -3rem;
  }

  .contact {
    justify-content: center;
  }
}
</style>
