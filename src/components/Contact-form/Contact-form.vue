<script setup lang="ts">
import {
  sendEmail,
  type SendEmailInput
} from '../../core/services/email-service.ts';
import { reactive } from 'vue';
import { type ContactFormData, type HomeData } from '../../core/types/data.type.ts';
import ButtonForm from '../Button-form/Button-form.vue';

const props = defineProps<{
  buttonContent: string;
  formKeys: ContactFormData;
  personalInfo: HomeData
}>();

interface Form {
  name: string;
  email: string;
  subject: string;
  content: string;
}

const contactForm = reactive<Form>({
  name: '',
  email: '',
  subject: '',
  content: ''
});

const handleChange = (e: FormDataEvent): void => {
  const target = e.target as HTMLInputElement
  const key = target?.id as keyof Form
  contactForm[key] = target?.value;
};

const resetContactForm = (): void => {
  contactForm.name = '';
  contactForm.email = '';
  contactForm.subject = '';
  contactForm.content = '';
};

const handleContactSubmit = async (e: FormDataEvent): Promise<void> => {
  e.preventDefault();

  const sendEmailInput: SendEmailInput = {
    to: props.personalInfo.email,
    from: contactForm.name,
    email: contactForm.email,
    subject: contactForm.subject,
    content: contactForm.content
  };

  const response = await sendEmail(sendEmailInput);

  if (response) {
    resetContactForm();
  }
};
</script>

<template>
  <form class="contact__form" @onsubmit="(e: FormDataEvent) => handleContactSubmit(e)">
    <div class="contact__field">
      <label>
        {{ props.formKeys.name }}
        <input
          id="name"
          :value="contactForm.name"
          @oninput="(e: FormDataEvent) => handleChange(e)"
          required
        />
      </label>
      <label>
        {{ props.formKeys.subject }}
        <input
          id="subject"
          :value="contactForm.subject"
          @oninput="(e: FormDataEvent) => handleChange(e)"
          required
        />
      </label>
      <label>
        {{ props.formKeys.email }}
        <input
          class="email-input"
          id="email"
          type="email"
          :value="contactForm.email"
          @oninput="(e: FormDataEvent) => handleChange(e)"
          required
        />
      </label>
      <label>
        {{ props.formKeys.content }}
        <textarea
          id="content"
          maxlength="500"
          :value="contactForm.content"
          @oninput="(e: FormDataEvent) => handleChange(e)"
          required
        />
      </label>
    </div>
    <ButtonForm v-if="props.buttonContent" :content="props.buttonContent" />
   </form>
</template>

<style scoped>
.contact__form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}

.contact__field {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}

.email-input {
  text-transform: none;
}

textarea {
  text-transform: capitalize;
  padding: 1rem;
  width: 100%;
  height: 12rem;
  resize: none;
  background-color: transparent;
  border: 1px solid var(--text-gray);
  color: var(--text-gray);
}

@media screen and (max-width: 1200px) {
  .contact__form {
    width: 100%;
  }
}

@media screen and (max-width: 550px) {
  .contact__form {
    width: 100%;
  }
}
</style>