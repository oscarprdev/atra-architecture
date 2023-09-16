<template>
  <div class="loader-container">
    <span class="loader"></span>
    <slot name="text" />
  </div>
</template>

<style>
.loader-container {
  height: 50vh;
  width: 100%;
  display: grid;
  place-items: center;
}
/* 
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid rgb(107, 107, 107);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} */

.loader {
  color: rgb(107, 107, 107);
  position: relative;
  font-size: 11px;
  background: rgb(107, 107, 107);
  animation: escaleY 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
  left: 2em;
  background: rgb(107, 107, 107);
  width: 1em;
  height: 4em;
  animation: escaleY 1s infinite ease-in-out;
}
.loader:before {
  left: -2em;
  animation-delay: -0.32s;
}

@keyframes escaleY {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
</style>
