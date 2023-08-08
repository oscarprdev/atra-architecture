<script setup lang="ts">
import image1 from "../../assets/images/image-1.webp";
import image2 from "../../assets/images/image-2.webp";
import image3 from "../../assets/images/image-3.webp";
import image4 from "../../assets/images/image-4.webp";
import image5 from "../../assets/images/image-5.webp";
import image6 from "../../assets/images/image-6.webp";
import Lazy from "../Lazy/Lazy.vue";
</script>

<template>
  <section class="gallery-container">
    <h1>Projectes</h1>
    <div class="gallery">
      <Lazy>
        <article>
          <div class="image-container">
            <img :src="image1" alt="image" />
          </div>
          <h2>2018 Rocafort</h2>
        </article>
      </Lazy>
      <Lazy>
        <article>
          <div class="image-container">
            <img :src="image2" alt="image" />
          </div>
          <h2>2016 Progres 343</h2>
        </article>
      </Lazy>
      <Lazy>
        <article>
          <div class="image-container">
            <img :src="image3" alt="image" />
          </div>
          <h2>2015 Baldoma</h2>
        </article>
      </Lazy>
      <Lazy>
        <article style="animation-delay: 0.1s">
          <div class="image-container">
            <img :src="image4" alt="image" />
          </div>
          <h2>2014 Sagunt</h2>
        </article>
      </Lazy>
      <Lazy>
        <article style="animation-delay: 0.3s">
          <div class="image-container">
            <img :src="image5" alt="image" />
          </div>
          <h2>2013 Albal</h2>
        </article>
      </Lazy>
      <Lazy>
        <article style="animation-delay: 0.5s">
          <div class="image-container">
            <img :src="image6" alt="image" />
          </div>
          <h2>2011 Quart de les valls</h2>
        </article>
      </Lazy>
    </div>
  </section>
</template>

<style scoped>
.gallery-container {
  position: inherit;
  padding: 12rem 0 0;
  height: fit-content;
  max-width: 100vw;
  z-index: 2;
}

.gallery {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 1rem;
}

h1 {
  position: absolute;
  top: -1rem;
  right: 3rem;

  color: #fff;
  text-align: center;
  z-index: 3;

  font-size: clamp(2rem, 10vw, 8rem);
  text-transform: uppercase;
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
  .gallery {
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
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
</style>
