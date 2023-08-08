<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isVisible = ref(false);
const componentRef = ref(null);

const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
);

onMounted(() => {
  if (componentRef.value) {
    observer.observe(componentRef.value);
  }
});

onBeforeUnmount(() => {
  if (componentRef.value) {
    observer.unobserve(componentRef.value);
  }
});
</script>

<template>
  <section
      ref="componentRef"
      :class="isVisible ? 'visible' : 'notVisible'"
  >
    <slot />
  </section>
</template>

<style>
.visible {
opacity: 1;
transform: translateY(0);
transition: all 1s ease-in-out;
}

.notVisible {
opacity: 0;
transform: translateY(80px);
}
</style>