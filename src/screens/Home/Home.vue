<script setup lang="ts">
import Hero from "../../components/Hero.vue";
import About from "../About/About.vue";
</script>

<template>
  <section class="home">
    <span class="cube-left"/>
    <span class="cube-right"/>
    <span class="line-top"/>
    <span class="line-bottom"/>
    <Hero/>
    <About/>
  </section>
</template>

<style scoped>
  .home {
    background-color: var(--bg-gray);
    position: relative;
    z-index: 1;
  }

  .home:after {
    content: '';
    position: absolute;

    width: 50rem;
    height: 50rem;

    border: 12rem solid transparent;
    top: -35rem;
    left: -30rem;
    border-radius: 50%;
    z-index: -1;

    box-shadow: inset 0 0 2px 2px white,  0 0 2px 2px white;
  }

  .home:before {
    content: '';
    position: absolute;

    width: 50rem;
    height: 50rem;

    border: 12rem solid transparent;
    bottom: 18%;
    right: -30rem;
    border-radius: 50%;
    z-index: -1;

    box-shadow: inset 0 0 2px 2px white,  0 0 2px 2px white;
  }

  .cube-right {
    content: '';
    position: absolute;

    width: 45rem;
    height: 45rem;

    background-color: var(--bg-gray);


    transform-origin: right bottom;
    bottom: 45%;
    right: 0;

    animation: cube-rotate 3s ease-in-out forwards;
  }

  .cube-left {
    content: '';
    position: absolute;

    width: 45rem;
    height: 40rem;

    background-color: var(--bg-gray);

    transform-origin: left top;
    left: 0;
    top: 0;
    animation: cube-rotate 3s ease-in-out forwards;
  }

  .line-top {
    content: '';
    position: absolute;

    height: 2px;

    background-color: #fff;

    top: 23rem;

    animation: line-top 5s ease forwards;
  }

  .line-bottom {
    content: '';
    position: absolute;

    height: 2px;
    width: 100rem;

    background-color: #fff;

    top: 48rem;
    right: 0;

    animation: line-bottom 5s ease forwards;
  }

  @keyframes cube-rotate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(90deg);
    }
  }

  @keyframes line-top {
    0% {
      transform: translateX(-50rem);
      width: 0;
    }

    30% {
      width: 100vw;
    }

    100% {
      transform: translateX(150vw);
    }
  }

  @keyframes line-bottom {
    0% {
      transform: translateX(50rem);
      width: 0;
    }

    30% {
      width: 100vw;
    }

    100% {
      transform: translateX(-150vw);
    }
  }
</style>
