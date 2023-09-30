<script setup lang="ts">
import { Transition, onMounted, ref } from 'vue';

const imagesList = [
  'https://res.cloudinary.com/oscar-perez/image/upload/v1694443129/ATRA/hero/cuina_rocafort_nhbeza.jpg',
  'https://res.cloudinary.com/oscar-perez/image/upload/v1694443123/ATRA/hero/santa_ana_ms2iui.jpg',
  'https://res.cloudinary.com/oscar-perez/image/upload/v1694443120/ATRA/hero/puzol_itdkcb.jpg',
];

const currentImage = ref<string>();

onMounted(() => {
  let currentIndex = 0;
  currentImage.value = imagesList[currentIndex];

  setInterval(() => {
    currentImage.value = imagesList[currentIndex];

    currentIndex++;

    if (currentIndex === 2) {
      currentIndex = 0;
    }
  }, 7000);
});
</script>

<template>
  <section class="hero">
    <div class="hero-title">
      <h1>ATRA</h1>
      <p>Asistència tècnica en rehabilitació i arquitectura</p>
      <p>Jaume Perez Llopis</p>
    </div>

    <figure class="image-wrapper">
      <Transition name="fade" mode="default">
        <img
          v-if="currentImage"
          :key="currentImage"
          :src="currentImage"
          alt="imatge destacada de projecte"
        />
      </Transition>
    </figure>
  </section>
</template>

<style scoped>
.hero {
  padding: 3rem;
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-title {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin-top: -10rem;
  position: relative;
}

.hero-title::after {
  content: '';
  position: absolute;
  width: 20rem;
  height: 3px;
  background-color: var(--dark);
  top: 18rem;
  left: 4rem;
  background-color: rgb(109, 109, 109);
}

h1 {
  font-size: clamp(2rem, 15vw, 10rem);
  line-height: 1px;
  color: rgb(0, 0, 0);
  margin: 4rem;
}

p {
  color: rgb(0, 0, 0);
  font-size: clamp(1rem, 3vw, 1.5rem);
  margin: 0.5rem;
}

p:nth-child(odd) {
  color: rgb(155, 155, 155);
}

.image-wrapper {
  width: 40vw;
  height: 70vh;
  margin-right: 5rem;
  margin-top: 5rem;
  border: none;
  z-index: 2;
}

.image-wrapper::after {
  z-index: -1;
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 40vw;
  height: 100vh;
  background-color: var(--dark);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 630px) {
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .hero-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 3rem;
    position: relative;
  }

  .hero-title::after {
    display: none;
  }

  h1 {
    margin: 2rem;
  }

  .image-wrapper {
    width: 80vw;
    height: 50vh;
    margin-right: 2rem;
    margin-top: 3rem;
    border: none;
    z-index: 2;
  }

  .image-wrapper::after {
    width: 100vw;
    height: 45vh;
    top: 55vh;
    bottom: 0;
  }
}
</style>
