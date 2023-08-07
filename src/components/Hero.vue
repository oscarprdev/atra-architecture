<script setup lang="ts">

</script>

<template>
  <section class="hero">
    <div class="title">
      <h1>ATRA</h1>
      <p>asistència tècnica en rehabilitació i arquitectura</p>
    </div>
    <div class="contact">
      <h2>Jaume Perez Llopis</h2>
      <h3>615 88 65 20</h3>
      <h3>jaumeperezllopis@gmail.com</h3>
      <h3>c/ Els Dolors, 37
        46500 Sagunt
        (Valencia) Spain</h3>
    </div>
  </section>
</template>

<style scoped>
  .hero {
    padding: 3rem 5rem;
    position: relative;
    height: 100vh;
  }

  .title {
    display: flex;
    flex-direction: column;
    align-content: center;

    animation: fade-right 2s linear forwards;
  }

  h1 {
    font-size: 15rem;
    line-height: 1px;
  }

  p {
    margin-top: -5rem;
    font-size: 1.62rem;
  }

  .contact {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 3rem 12rem;

    animation: fade-left 2s linear forwards;
  }

  @keyframes fade-right {
    0% {
      transform: translateX(-20rem);
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
      transform: translateX(20rem);
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
</style>