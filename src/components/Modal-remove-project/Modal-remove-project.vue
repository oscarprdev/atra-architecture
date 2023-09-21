<script setup lang="ts">
import { ref } from 'vue';
import { DefaultAdminService } from '../../core/services/admin-service';
import Loader from '../Loader/Loader.vue';
import Toast from '../Toast/Toast.vue';
import { useToast } from '../../core/composables/useToast';

const props = defineProps<{
  projectId: string;
  projectName: string;
}>();

const emit = defineEmits<{
  (e: 'onCloseModal'): void;
  (e: 'onUpdateProjectList'): void;
}>();

const isRemoving = ref(false);
const { toastState, manageToastState } = useToast();

const onRemoveProject = async () => {
  isRemoving.value = true;

  const status = await new DefaultAdminService().removeProjectById({
    id: props.projectId,
  });

  manageToastState(
    status,
    'Project eliminat correctament',
    'Error eliminant projecte'
  );
  emit('onCloseModal');
  emit('onUpdateProjectList');
  isRemoving.value = false;
};
</script>

<template>
  <section class="remove-project-modal">
    <template v-if="!isRemoving">
      <p>
        Estas segur que vols eliminar el projecte de
        <b>{{ props.projectName }}</b> ?
      </p>
      <div class="buttons-wrapper">
        <button class="modal-btn cancel-btn" @click="emit('onCloseModal')">
          No
        </button>
        <button class="modal-btn remove-btn" @click="onRemoveProject">
          Si, estic segur
        </button>
      </div>
    </template>
    <template v-else-if="isRemoving">
      <div class="loader-wrapper">
        <Loader />
        Eliminant projecte
      </div>
    </template>
    <Toast
      v-if="toastState.open"
      :content="toastState.content"
      :type="toastState.type"
    />
  </section>
</template>

<style scoped>
.remove-project-modal {
  display: grid;
  place-items: center;

  width: 30vw;
  height: 30vh;

  padding: 3rem 0;
}

.loader-wrapper {
  display: grid;
  place-items: center;
  height: 7rem;
}

.buttons-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  width: 70%;
  gap: 1rem;
  height: fit-content;
}

.modal-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.8rem 1.2rem;

  border-radius: var(--dashboard-items-radius);
  border-radius: 3rem;
  border: none;
  box-shadow: 0 0 3px 3px rgba(90, 90, 90, 0.11);
  color: white;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;

  cursor: pointer;
}

.cancel-btn {
  padding: 0.8rem 3rem;
  background: linear-gradient(
    0deg,
    rgb(182, 182, 182) 0%,
    rgb(73, 73, 73) 100%
  );
}

.cancel-btn:hover {
  background: linear-gradient(
    0deg,
    rgb(160, 160, 160) 0%,
    rgb(68, 68, 68) 100%
  );
}

.remove-btn {
  background: linear-gradient(
    0deg,
    rgb(255, 179, 103) 0%,
    rgba(255, 119, 21, 1) 100%
  );
}

.remove-btn:hover {
  background: linear-gradient(
    0deg,
    rgb(255, 157, 60) 0%,
    rgb(255, 110, 6) 100%
  );
}
</style>
