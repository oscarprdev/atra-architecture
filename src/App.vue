<script setup lang="ts">
import Header from './components/Header/Header.vue';
import { Toaster } from 'vue-sonner';
</script>

<template>
  <main>
    <Header />
    <router-view></router-view>
    <Toaster />
  </main>
</template>

<style>
main {
  height: 100%;
  width: 100vw;
  background-color: var(--bg-gray);
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
