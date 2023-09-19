<script setup lang="ts">
const props = defineProps<{
    projectId: string,
    projectName: string
}>()

const emit = defineEmits<{
    (e: 'onCloseModal'): void
}>()

const onRemoveProject = () => {
    // const status = new DefaultAdminService().removeProjectById(props.projectId)
}

</script>

<template>
    <section>
        <p>Estas segur que vols eliminar el projecte de {{ props.projectName }} ?</p>
    <div>
        <button @click="emit('onCloseModal')">No</button>
        <button @click="onRemoveProject">Si, estic segur</button>
    </div>
    </section>
    
</template>

<style scoped></style>