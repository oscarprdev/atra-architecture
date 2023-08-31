<script setup lang="ts">
import Button from '../Button/Button.vue';
</script>

<template>
  <article>
    <h2>Actualitzar Descripcio</h2>
    <form>
      <label>
        Imatge
        <input type="file" />
      </label>
      <label>
        Parraf 1
        <textarea />
      </label>
      <label>
        Parraf 2
        <textarea />
      </label>
      <label>
        Parraf 3
        <textarea />
      </label>
      <Button content="Actualitzar" type="submit" />
    </form>
  </article>
</template>

<style>
article {
  width: 70vw;
  max-width: 800px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>
