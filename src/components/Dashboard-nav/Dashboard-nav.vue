<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from '../Button/Button.vue';
import type { DashboardView } from '../Dashboard/Dashboard.vue';

const props = defineProps<{
  dashboardView: DashboardView;
}>();

const router = useRouter();

const handleCloseSession = async (): Promise<void> => {
  document.cookie = 'false';
  await router.push('/');
};

const emit = defineEmits<{
  toggleView: [view: string];
}>();
</script>

<template>
  <nav>
    <ul class="nav-list">
      <li
        :class="`nav-item ${props.dashboardView.personal && 'active'}`"
        v-on:click="emit('toggleView', 'personal')"
      >
        Informacio personal
      </li>
      <li
        :class="`nav-item ${props.dashboardView.about && 'active'}`"
        v-on:click="emit('toggleView', 'about')"
      >
        Descripcio
      </li>
      <li class="nav-item">Projectes</li>
      <li class="nav-item">Admin</li>
    </ul>
    <Button
      class="button"
      v-on:click="handleCloseSession"
      content="Tancar sessio"
      type="button"
    />
  </nav>
</template>

<style>
nav {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 3rem 1rem;
  justify-content: space-between;
  font-size: 1.3rem;
  width: 15vw;
  height: 100vh;
  border-right: 1px solid black;

  background-color: var(--dark);
  color: white;
}

.nav-list {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 3rem;
}

.button {
  padding: 1rem;
}

.nav-item {
  cursor: pointer;
  font-size: clamp(0.7rem, 5vw, 1rem);
  position: relative;

  font-family:
    system-ui,
    -apple-system,
    Roboto !important;
}

.nav-item:before {
  content: '';
  width: 3rem;
  height: 1px;
  background-color: white;
  position: absolute;
  bottom: -5px;
  left: 0;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s ease;
}

.nav-item:hover:before {
  transform: scaleX(1);
}

.active:before {
  content: '';
  width: 3rem;
  height: 1px;
  background-color: white;
  bottom: -5px;
  left: 0;
  transform: scaleX(1);
  transform-origin: left center;
  transition: transform 0.3s ease;
}
</style>
