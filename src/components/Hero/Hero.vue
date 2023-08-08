<script setup lang="ts"></script>

<template>
  <section class="hero">
    <div class="title">
      <h1>ATRA</h1>
      <p>Asistència Tècnica en Rehabilitació i Arquitectura</p>
    </div>
    <div class="contact">
      <h2>Jaume Perez Llopis</h2>
      <h3>615 88 65 20</h3>
      <h3>jaumeperezllopis@gmail.com</h3>
      <h3 class="direction">c/ Els Dolors, 37 46500 Sagunt (Valencia) Spain</h3>
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

  animation: fade-right 2s linear forwards;
}

h1 {
  font-size: clamp(2rem, 25vw, 15rem);
  line-height: 1px;
}

p {
  margin-top: -5rem;
  font-size: clamp(1rem, 2vw, 1.72rem);
}

.contact {
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 3rem 12rem;

  animation: fade-left 2s linear forwards;
}

.contact h2 {
  font-size: clamp(0.6rem, 5vw, 1.5rem);
}

.contact h3 {
  font-size: clamp(0.5rem, 4vw, 1.2rem);
}

@keyframes fade-right {
  0% {
    transform: translateX(clamp(-5rem, 10vw, -20rem));
    opacity: 0;
  }

  50% {
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fade-left {
  0% {
    transform: translateX(clamp(5rem, 5vw, 20rem));
    opacity: 0;
  }

  50% {
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@media screen and (max-width: 450px) {
  .hero {
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 35vh;
  }

  .title {
    text-align: center;

    animation: fade-right 1s linear forwards;
  }

  .contact {
    position: relative;

    padding: 1rem;
    text-align: center;

    animation: fade-left 1s linear forwards;
  }

  .direction {
    display: none;
  }

  p {
    margin-top: -2rem;
  }
}
</style>
