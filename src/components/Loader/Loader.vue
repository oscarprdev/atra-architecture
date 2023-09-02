<template>
  <div class="loader-container">
    <span class="loader"></span>
    <slot name="text" />
  </div>
</template>

<style>
.loader-container {
  display: grid;
  place-items: center;
}

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
}
</style>
