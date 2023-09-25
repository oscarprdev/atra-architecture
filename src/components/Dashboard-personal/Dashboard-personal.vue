<script setup lang="ts">
import { DefaultHomeService } from '../../core/services/home-service';
import Button from '../Button/Button.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import { DefaultAdminService } from '../../core/services/admin-service';
import Toast from '../Toast/Toast.vue';
import { useToast } from '../../core/composables/useToast';
import { IconInfoCircle } from '@tabler/icons-vue';

interface DashboardPersonalInfo {
  email: string;
  direction: string;
  phone: string;
}

const personalInfoUpdating = ref(false);
const canSubmit = ref(false);
const personalInfo = reactive<DashboardPersonalInfo>({
  email: '...',
  direction: '...',
  phone: '...',
});
const { toastState, manageToastState } = useToast();

const providePersonalInfo = async () => {
  const heroText = await new DefaultHomeService().getHeroText();

  personalInfo.email = heroText.data.email;
  personalInfo.direction = heroText.data.direction;
  personalInfo.phone = heroText.data.phone;
};

const phoneIsNotValid = computed(
  () => !Number(personalInfo.phone) && personalInfo.phone.length !== 11
);

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

  if (!phoneIsNotValid) {
    personalInfoUpdating.value = true;

    const { status } = await new DefaultAdminService().updatePersonalInfo(
      personalInfo
    );

    manageToastState(
      status,
      'Dades personals actualitzades correctament',
      'Error actualitzant les daded personals'
    );

    personalInfoUpdating.value = false;
  }
};

onMounted(async () => {
  canSubmit.value = false;
  await providePersonalInfo();
  canSubmit.value = true;
});
</script>

<template>
  <section class="dashboard-personal">
    <h2 class="dashboard-personal-title">Actualitzar informacio personal</h2>
    <form class="dashboard-personal-form" v-on:submit="handleSubmit">
      <label>
        Email
        <input
          :disabled="!canSubmit"
          required
          type="email"
          id="email"
          v-on:input="handleChange"
          :value="personalInfo.email"
        />
      </label>
      <label>
        Direccio
        <input
          :disabled="!canSubmit"
          required
          id="direction"
          v-on:input="handleChange"
          :value="personalInfo.direction"
        />
      </label>
      <label class="input-phone">
        Telefon
        <p class="input-error" v-if="phoneIsNotValid">
          * El telefon deu ser un numero valid
        </p>
        <input
          :disabled="!canSubmit"
          required
          id="phone"
          v-on:input="handleChange"
          :value="personalInfo.phone"
        />
      </label>
      <button
        :disabled="phoneIsNotValid || !canSubmit"
        class="update-info-btn"
        type="submit"
      >
        {{
          personalInfoUpdating
            ? 'Actualitzant...'
            : !canSubmit
            ? 'Carregant info...'
            : 'Actualitzar'
        }}
      </button>
    </form>
    <article class="info-bubble">
      <IconInfoCircle color="white" />
      <p class="info-bubble-text">
        Aquesta informacio apareixera en la vista de "Contacte" de la web
      </p>
    </article>
    <Toast
      v-if="toastState.open"
      :content="toastState.content"
      :type="toastState.type"
    />
  </section>
</template>

<style scoped>
.dashboard-personal {
  display: grid;
  place-items: flex-start;
  justify-items: center;
  gap: 1rem;
  padding: 5rem;

  width: 100%;
  height: 100vh;
}

.info-bubble {
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 2px 2px rgba(254, 85, 0, 0.14);
  background: rgb(255, 179, 103);
  color: white;
}

.info-bubble-text {
  color: white;
}

.dashboard-personal-title {
  position: absolute;
  top: 0;
  font-family:
    cormorant,
    -apple-system,
    sans-serif !important;
  font-weight: 400 !important;
  color: #515151;
  font-size: 1.6rem;
}

.dashboard-personal-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  width: 50%;
  height: fit-content;
  border-radius: var(--dashboard-radius);
  padding: 1rem;
  gap: 1rem;

  box-shadow: 0 0 3px 3px rgba(104, 104, 104, 0.082);
}

label {
  width: 100%;
  font-weight: bold;
  text-transform: capitalize;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
}

input {
  color: rgb(31, 31, 31);
  width: 100%;
  border: 1px solid var(--image-border-brown);
  caret-color: var(--dark);
  border-radius: var(--dashboard-items-radius);
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
}

.update-info-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 1rem 1.8rem;

  border-radius: var(--border-radius-btn);
  border: none;
  box-shadow: var(--shadow-btn);
  color: white;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;

  cursor: pointer;
}

input[disabled] {
  background: rgb(242, 242, 242);
}

.input-phone {
  display: flex;
  align-items: flex-start;
  gap: 0.2rem;
  position: relative;
}

.input-error {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.6rem;
  color: rgb(223, 0, 0);
  text-transform: none;
}

.update-info-btn {
  background: var(--colorful-bg-btn);
}

.update-info-btn:hover {
  background: var(--colorful-hover-bg-btn);
}

.update-info-btn[disabled] {
  background: rgb(225, 225, 225);
  box-shadow: none;
}

.update-info-btn[disabled]:hover {
  cursor: not-allowed;
  background: rgb(225, 225, 225);
  box-shadow: none;
}
</style>
