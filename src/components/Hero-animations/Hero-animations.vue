<script setup>
import { ref, onMounted } from "vue";

const cubeLeft = ref(null);
const cubeRight = ref(null);
const lineTop = ref(null);
const lineBottom = ref(null);

const startAnimation = () => {
  const cubeLeft = document.querySelector(".cube-left");
  const cubeRight = document.querySelector(".cube-right");
  const lineTop = document.querySelector(".line-top");
  const lineBottom = document.querySelector(".line-bottom");

  cubeLeft.style.animationPlayState = "running";
  cubeRight.style.animationPlayState = "running";
  lineTop.style.animationPlayState = "running";
  lineBottom.style.animationPlayState = "running";
};

onMounted(() => {
  startAnimation();

  cubeLeft.value.addEventListener("animationend", () => {
    cubeLeft.value.remove();
  });
  cubeRight.value.addEventListener("animationend", () => {
    cubeRight.value.remove();
  });
  lineTop.value.addEventListener("animationend", () => {
    lineTop.value.remove();
  });
  lineBottom.value.addEventListener("animationend", () => {
    lineBottom.value.remove();
  });
});
</script>

<template>
  <div>
    <span class="circle-top" />
    <span class="circle-bottom" />
    <span class="cube-left" ref="cubeLeft" />
    <span class="cube-right" ref="cubeRight" />
    <span class="line-top" ref="lineTop" />
    <span class="line-bottom" ref="lineBottom" />
  </div>
</template>

<style scoped>
.circle-top {
  content: "";
  position: fixed;

  width: 82rem;
  height: 82rem;

  border: 12rem solid transparent;
  top: -70%;
  left: -30%;
  border-radius: 50%;
  z-index: -1;

  box-shadow:
    inset 0 0 2px 2px white,
    0 0 2px 2px white;
}

.circle-bottom {
  content: "";
  position: fixed;

  width: 80rem;
  height: 80rem;

  border: 12rem solid transparent;
  bottom: -70%;
  right: -30%;
  border-radius: 50%;
  z-index: -1;

  box-shadow:
    inset 0 0 2px 2px white,
    0 0 2px 2px white;
}

@media (max-width: 450px) {
  .circle-top,
  .circle-bottom {
    width: 30rem;
    height: 30rem;
  }

  .circle-top {
    top: -30%;
    left: -60%;
    border: 8rem solid transparent;
  }

  .circle-bottom {
    bottom: -30%;
    right: -70%;
    border: 8rem solid transparent;
  }
}

.cube-right {
  content: "";
  position: fixed;

  width: 65rem;
  height: 60rem;

  background-color: var(--bg-gray);

  transform-origin: right bottom;
  bottom: 0;
  right: 0;
  z-index: -1;

  animation: cube-rotate 2.2s ease-in-out forwards;
}

.cube-left {
  content: "";
  position: absolute;

  width: 45rem;
  height: 40rem;

  background-color: var(--bg-gray);

  transform-origin: left top;
  left: 0;
  top: 0;
  z-index: -1;

  animation: cube-rotate 2.2s ease-in-out forwards;
}

.line-top {
  content: "";
  position: absolute;

  height: 2px;

  background-color: #fff;

  top: 23rem;

  animation: line-top 5s ease forwards;
}

.line-bottom {
  content: "";
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
    display: none;
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
    display: none;
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
    display: none;
  }
}

@media screen and (max-width: 450px) {
  .cube-right {
    width: 20rem;
    height: 20rem;
    animation: cube-rotate 1.5s linear forwards;
  }

  .cube-left {
    width: 20rem;
    height: 20rem;

    animation: cube-rotate 1.5s linear forwards;
  }

  .line-top {
    left: 20%;
    top: 0;

    height: 150rem;
    width: 2px;

    animation: line-top 4s ease forwards;
  }

  .line-bottom {
    right: 20%;
    top: 0;

    height: 150rem;
    width: 2px;

    animation: line-bottom 6.5s ease forwards;
  }

  @keyframes line-top {
    0% {
      transform: translateY(-20rem);
      height: 0;
    }

    30% {
      height: 100vh;
    }

    100% {
      transform: translateY(120vh);
      display: none;
    }
  }

  @keyframes line-bottom {
    0% {
      transform: translateY(100vh);
      height: 0;
    }

    30% {
      height: 100vh;
    }

    100% {
      transform: translateY(-150rem);
      display: none;
    }
  }
}
</style>
