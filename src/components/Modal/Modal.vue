<script setup lang="ts"></script>

<template>
  <div class="modal-backdrop">
    <div class="modal">this is the modal</div>
  </div>
</template>

<style>
.modal-backdrop {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(58, 58, 58, 0.3);

  display: grid;
  place-items: center;
  z-index: 10;

  backdrop-filter: blur(3px);
}

.modal {
  width: 50vw;
  height: 50vh;
  background-color: white;
  display: grid;
  place-items: center;
}
</style>
