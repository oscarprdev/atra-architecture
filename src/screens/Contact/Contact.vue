<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const Contact = defineAsyncComponent(
  () => import("../../components/Contact/Contact.vue"),
);
</script>

<template>
  <section class="contact">
    <Contact />
  </section>
</template>

<style scoped>
.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100%;
  padding-bottom: 5rem;
  background-color: var(--bg-gray);
  position: relative;
}
</style>
