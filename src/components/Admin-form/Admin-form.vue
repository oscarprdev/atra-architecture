<script setup lang="ts">
import ButtonForm from '../Button-form/Button-form.vue';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { adminSignIn, type AdminSignInInput } from '../../core/services/admin-service';

const router = useRouter()

interface AdminForm {
  email: string
  password: string
}

const adminForm = reactive<AdminForm>({
  email: '',
  password: ''
});

const handleChange = (e: FormDataEvent): void => {
  const target = e.target as HTMLInputElement
  const key = target?.id as keyof AdminForm
  adminForm[key] = target?.value;
};

const handleSubmit = async (e: FormDataEvent): Promise<void> => {
  e.preventDefault()
  const adminSignInInput: AdminSignInInput = {
    email: adminForm.email,
    password: adminForm.password
  }
  const response = await adminSignIn(adminSignInInput)
  if (response) {
    document.cookie = 'true'
    await router.push('/dashboard')
  }
}
</script>

<template>
  <form @onsubmit="(e: FormDataEvent) => handleSubmit(e)" class="admin__form">
    <label>
      Email
      <input
          type="email"
          id="email"
          required
          @oninput="(e: FormDataEvent) => handleChange(e)"/>
    </label>
    <label>
      Contrasenya
      <input
          type="password"
          id="password" required
          @oninput="(e: FormDataEvent) => handleChange(e)"/>
    </label>
    <ButtonForm content="Entrar" />
  </form>
</template>

<style scoped>
.admin__form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 80vw;
  max-width: 700px;

  background-color: var(--dark);
  color: var(--text-gray);

  padding: 5rem;
}
</style>
