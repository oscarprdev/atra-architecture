<template>
  <div class="loader-container">
    <span class="loader"></span>
    <slot name="text" />
  </div>
</template>

<style>
.loader-container {
  position: relative;
  height: inherit;
  width: 100%;
  height: 10vh;
  display: grid;
  place-items: center;
}

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
