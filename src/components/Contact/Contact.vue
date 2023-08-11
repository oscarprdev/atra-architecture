<script setup lang="ts">
import {onMounted, ref, Ref} from "vue";
import {ContactForm, HomeData} from "../../core/types/data.type.ts";
import {getContactData, getHomeData} from "../../core/services/data-service.ts";

const personalInfo: Ref<HomeData> = ref();
const contactImage = ref()
const formKeys: Ref<ContactForm> = ref()
const buttonContent: Ref<string> = ref()

onMounted(async () => {
  const home = await getHomeData();
  personalInfo.value = home.data;

  const contact = await getContactData()
  contactImage.value = contact.mainImage
  formKeys.value = contact.form
  buttonContent.value = contact.button
});
</script>

<template>
  <h1 class="contact__title">Contacte</h1>
  <div class="contact__image-container">
    <img v-if="contactImage" class="contact__image" :src="contactImage" alt="random background contact image"/>
  </div>
  <div class="contact__container">
    <article class="contact__info" v-if="personalInfo">
      <h2>{{ personalInfo.name }}</h2>
      <h3>{{ personalInfo.phone }}</h3>
      <h3>{{ personalInfo.email }}</h3>
      <h3>{{ personalInfo.direction }}</h3>
    </article>
    <form class="contact__form">
      <div class="contact__field" v-if="formKeys">
        <label>
          {{formKeys.name}}
          <input id="name" required/>
        </label>
        <label>
          {{formKeys.surname}}
          <input id="surname" required/>
        </label>
        <label>
          {{formKeys.subject}}
          <input id="subject" required/>
        </label>
        <label>
          {{formKeys.email}}
          <input id="email" type="email" required/>
        </label>
        <label>
          {{formKeys.content}}
          <textarea maxlength="500" required/>
        </label>
      </div>
      <button v-if="buttonContent" type="submit">
        <span>{{buttonContent}}</span>
      </button>
    </form>

  </div>
</template>

<style scoped>
.contact__title {
  color: #fff;
  font-size: clamp(4rem, 10vw, 8rem);
  text-transform: uppercase;
  z-index: 1;

  animation: fade-left ease-in-out 0.5s;
}

.contact__image-container {
  width: 40vw;
  height: 40rem;
  position: absolute;
  top: 12rem;
  left: 12rem;
}

.contact__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contact__container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;

  padding: 3rem;
  width: 50vw;

  z-index: 1;

  background-color: var(--dark);
  color: var(--text-gray);

  animation: fade-bottom ease-in-out 0.5s;
}

.contact__info {
  align-self: start;
  margin-left: 5rem;
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 80%;
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
}

input {
  text-transform: uppercase;
  padding: 1rem;
  background-color: transparent;
  border: 1px solid var(--text-gray);
  caret-color: var(--text-gray);
}

textarea {
  text-transform: uppercase;
  padding: 1rem;
  width: 100%;
  height: 12rem;
  resize: none;
  background-color: transparent;
  border: 1px solid var(--text-gray);
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

  transition: color .4s ease;
}

button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  background-color: rgba(33, 33, 33, 0.40);
  transform: translateY(100%);
  transition-delay: 0.5s;
  transition: transform 0.3s linear;
  z-index: 0;

}

button:hover::after {
  transform: translateY(0%);
}

button::before {
  content: '';
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


@keyframes fade-left {
  0% {
    opacity: 0;
    transform: translateX(-1rem);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-bottom {
  0% {
    opacity: 0;
    transform: translateY(2rem);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
