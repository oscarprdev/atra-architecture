<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

const handleCloseSession = async (): Promise<void> => {
  document.cookie = 'false'
  await router.push('/')
}

</script>

<template>
<ul>
  <li>
    <button v-on:click="handleCloseSession">Tancar sessio</button>
  </li>
</ul>
</template>

<style scoped>

</style>
