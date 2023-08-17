<script setup lang="ts">
import { type Home } from '../../core/types/data.type.ts';

const props = defineProps<{
  homeInfo: Home;
}>();
</script>

<template>
  <section class="hero">
    <div class="title">
      <h1>{{ props.homeInfo.title }}</h1>
      <p>{{ props.homeInfo.subtitle }}</p>
    </div>
    <div class="contact">
      <h2>{{ props.homeInfo.data.name }}</h2>
      <h3>{{ props.homeInfo.data.phone }}</h3>
      <h3>{{ props.homeInfo.data.email }}</h3>
      <h3 class="direction">{{ props.homeInfo.data.direction }}</h3>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 3rem 5rem;
  height: 100vh;
  width: 100vw;
  position: inherit;
  z-index: 0;
}

.title {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;

  z-index: 1;

  animation: fade-right 0.8s linear forwards;
}

h1 {
  font-size: clamp(2.4rem, 30vw, 15rem);
  line-height: 1px;
}

p {
  margin-top: -5rem;
  font-size: clamp(1.3rem, 2vw, 2rem);
}

.contact {
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 3rem 12rem;
  animation: fade-left 0.8s linear forwards;
}

.contact h2 {
  font-size: clamp(1.3rem, 5vw, 1.5rem);
}

.contact h3 {
  font-size: clamp(1.3rem, 4vw, 1.5rem);
}

@media screen and (max-width: 630px) {
  .hero {
    padding: 3rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 12vh;
  }

  .title {
    text-align: center;

    animation: fade-right 0.5s linear forwards;
  }

  .contact {
    position: relative;

    padding: 1rem;
    text-align: center;

    animation: fade-left 0.5s linear forwards;
  }

  .direction {
    display: none;
  }

  p {
    margin-top: -2rem;
  }
}
</style>
