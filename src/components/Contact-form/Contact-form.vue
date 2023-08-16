<script setup lang="ts">
import {
  sendEmail,
  SendEmailInput,
} from "../../core/services/email-service.ts";
import { reactive } from "vue";
import { ContactFormData } from "../../core/types/data.type.ts";

const props = defineProps<{
  buttonContent: string;
  formKeys: ContactFormData;
}>();

interface Form {
  name: string;
  surname: string;
  email: string;
  subject: string;
  content: string;
}

const contactForm = reactive<Form>({
  name: "",
  surname: "",
  email: "",
  subject: "",
  content: "",
});

const handleChange = (e: FormDataEvent) => {
  contactForm[e.target.id] = e.target.value;
};

const resetContactForm = () => {
  contactForm.name = "";
  contactForm.surname = "";
  contactForm.email = "";
  contactForm.subject = "";
  contactForm.content = "";
};

const handleContactSubmit = async (e: FormDataEvent) => {
  e.preventDefault();

  const sendEmailInput: SendEmailInput = {
    to: personalInfo.value.email,
    from: `${contactForm.name} ${contactForm.surname}`,
    email: contactForm.email,
    subject: contactForm.subject,
    content: contactForm.content,
  };

  const response = await sendEmail(sendEmailInput);

  if (response.ok) {
    resetContactForm();
  }
};
</script>

<template>
  <form class="contact__form" :onsubmit="(e) => handleContactSubmit(e)">
    <div class="contact__field">
      <label>
        {{ props.formKeys.name }}
        <input
          id="name"
          :value="contactForm.name"
          :oninput="(e) => handleChange(e)"
          required
        />
      </label>
      <label>
        {{ props.formKeys.surname }}
        <input
          id="surname"
          :value="contactForm.surname"
          :oninput="(e) => handleChange(e)"
          required
        />
      </label>
      <label>
        {{ props.formKeys.subject }}
        <input
          id="subject"
          :value="contactForm.subject"
          :oninput="(e) => handleChange(e)"
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
          :oninput="(e) => handleChange(e)"
          required
        />
      </label>
      <label>
        {{ props.formKeys.content }}
        <textarea
          id="content"
          maxlength="500"
          :value="contactForm.content"
          :oninput="(e) => handleChange(e)"
          required
        />
      </label>
    </div>
    <button v-if="props.buttonContent" type="submit">
      <span>{{ props.buttonContent }}</span>
    </button>
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

label {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  text-transform: uppercase;
}

input {
  text-transform: capitalize;
  padding: 1rem;
  background-color: transparent;
  border: 1px solid var(--text-gray);
  caret-color: var(--text-gray);
  color: var(--text-gray);
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

button {
  align-self: center;
  font-size: 1rem;
  padding: 1.2rem 0;
  width: 100%;
  cursor: pointer;
  text-transform: uppercase;
  border: none;
  position: relative;
  overflow: hidden;

  transition: color 0.4s ease;
}

button::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  background-color: rgba(33, 33, 33, 0.4);
  transform: translateY(100%);
  transition-delay: 0.5s;
  transition: transform 0.3s linear;
  z-index: 0;
}

button:hover::after {
  transform: translateY(0%);
}

button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  background-color: rgba(33, 33, 33, 0.53);
  transform: translateY(100%);
  transition: transform 0.6s linear;
  z-index: 0;
}

button:hover::before {
  transform: translateY(0%);
}

span {
  position: relative;
  z-index: 1;
  transition: color 0.6s linear;
}

button:hover span {
  color: #fff;
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
