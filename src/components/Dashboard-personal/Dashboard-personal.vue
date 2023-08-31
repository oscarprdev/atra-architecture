<script setup lang="ts">
import { DefaultHomeService } from '../../core/services/home-service';
import Button from '../Button/Button.vue';
import { onMounted, reactive, ref } from 'vue';
import { DefaultAdminService } from '../../core/services/admin-service';
import { toast } from 'vue-sonner';

interface DashboardPersonalInfo {
  email: string;
  direction: string;
  phone: string;
}

const personalInfoLoading = ref(false);

const personalInfo = reactive<DashboardPersonalInfo>({
  email: '',
  direction: '',
  phone: '',
});

const providePersonalInfo = async () => {
  const heroText = await new DefaultHomeService().getHeroText();

  personalInfo.email = heroText.data.email;
  personalInfo.direction = heroText.data.direction;
  personalInfo.phone = heroText.data.phone;
};

const handleChange = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  const key = target?.id as keyof DashboardPersonalInfo;
  personalInfo[key] = target?.value;

  if (target?.value === '') {
    providePersonalInfo();
  }
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();

  const response = await new DefaultAdminService().updatePersonalInfo(
    personalInfo
  );

  if (response.status === 400) {
    toast.error(
      'Error actualitzant la informacio personal, proba en 1 minut o contacta amb servei tecnic'
    );

    return;
  }

  toast.success('Informacio personal actualitzada correctament');
};

onMounted(async () => {
  personalInfoLoading.value = true;
  await providePersonalInfo();
  personalInfoLoading.value = false;
});
</script>

<template>
  <h2 class="dashboard-personal-title">Actualitzar informacio personal</h2>
  <div class="dashboard-personal">
    <form class="dashboard-personal-form" v-on:submit="handleSubmit">
      <label>
        Email
        <input type="email" id="email" v-on:input="handleChange" />
      </label>
      <label>
        Direccio
        <input id="direction" v-on:input="handleChange" />
      </label>
      <label>
        Telefon
        <input id="phone" v-on:input="handleChange" />
      </label>
      <Button content="Actualitzar" type="submit" />
    </form>
    <div class="dashboard-personal-prev">
      <h3>Vista previa</h3>
      <div class="dashboard-personal-card">
        <p v-if="personalInfoLoading">Carregant...</p>
        <p>{{ personalInfo?.email }}</p>
        <p>{{ personalInfo?.direction }}</p>
        <p>{{ personalInfo?.phone }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-personal-title {
  text-align: center;
  width: 85vw;
}

.dashboard-personal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem;
  width: 85vw;
}

.dashboard-personal-form {
  width: 50%;
  padding: 3rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  color: black;
}

.dashboard-personal-prev {
  width: 50%;
  padding: 3rem;

  display: flex;
  flex-direction: column;
}

.dashboard-personal-card {
  background-color: var(--dark);
  color: white;
  padding: 2rem;
  min-height: 180px;
}
</style>
