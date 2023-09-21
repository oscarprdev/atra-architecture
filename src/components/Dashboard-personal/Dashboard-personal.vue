<script setup lang="ts">
import { DefaultHomeService } from '../../core/services/home-service';
import Button from '../Button/Button.vue';
import { onMounted, reactive, ref } from 'vue';
import { DefaultAdminService } from '../../core/services/admin-service';
import Toast from '../Toast/Toast.vue';
import { useToast } from '../../core/composables/useToast';

interface DashboardPersonalInfo {
  email: string;
  direction: string;
  phone: string;
}

const editDisabled = ref(true);
const personalInfoUpdating = ref(false);

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

const handleChange = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  const key = target?.id as keyof DashboardPersonalInfo;
  personalInfo[key] = target?.value;

  if (target?.value === '') {
    providePersonalInfo();
  }
};

const toggleEdit = () => {
  editDisabled.value = !editDisabled.value;
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();

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
};

onMounted(async () => {
  await providePersonalInfo();
});
</script>

<template>
  <h2 class="dashboard-personal-title">Actualitzar informacio personal</h2>
  <form class="dashboard-personal-form" v-on:submit="handleSubmit">
    <label>
      Email
      <input
        type="email"
        id="email"
        v-on:input="handleChange"
        :disabled="editDisabled"
        :value="personalInfo.email"
      />
    </label>
    <label>
      Direccio
      <input
        id="direction"
        :disabled="editDisabled"
        v-on:input="handleChange"
        :value="personalInfo.direction"
      />
    </label>
    <label>
      Telefon
      <input
        id="phone"
        :disabled="editDisabled"
        v-on:input="handleChange"
        :value="personalInfo.phone"
      />
    </label>
    <Button
      class="submit-btn"
      v-if="!editDisabled"
      :content="`${personalInfoUpdating ? 'Actualitzant...' : 'Actualitzar'}`"
      type="submit"
    />
    <Button
      class="edit-btn"
      :content="`${editDisabled ? 'Editar' : 'No editar'}`"
      type="button"
      v-on:click="toggleEdit"
    />
  </form>
  <Toast
    v-if="toastState.open"
    :content="toastState.content"
    :type="toastState.type"
  />
</template>

<style scoped>
.dashboard-personal-title {
  text-align: center;
  width: 85vw;

  font-family:
    system-ui,
    -apple-system,
    Roboto !important;
}

.dashboard-personal-form {
  width: 50%;
  padding: 3rem;
  margin-top: -10rem;
  justify-self: center;
  position: relative;

  background-color: var(--dark);
  color: white;
  padding: 3rem 2rem;
  min-height: 180px;

  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input:disabled {
  border: none;
  padding: 1rem 0;
}
.edit-btn {
  position: absolute;
  top: 1rem;
  right: 2rem;
  width: 10rem;
  font-size: 0.8rem;
  padding: 0.8rem 1rem !important;
}
</style>
