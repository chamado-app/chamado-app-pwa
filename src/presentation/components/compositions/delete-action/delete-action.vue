<script lang="ts" setup>
import { reactive } from 'vue'

export type DeleteRegisterProps = {
  handleDelete: () => Promise<void>
}

const state = reactive({
  isOpen: false,
  isLoading: false
})

const props = defineProps<DeleteRegisterProps>()
const emit = defineEmits(['onDeleted'])

const onConfirm = async (): Promise<void> => {
  if (state.isLoading) return
  state.isLoading = true

  try {
    await props.handleDelete()
    emit('onDeleted')
  } catch (error) {
  } finally {
    state.isLoading = false
  }
}
</script>

<template>
  <q-dialog v-model="state.isOpen" persistent>
    <q-card class="delete-action__wrapper">
      <q-card-section
        class="delete-action__header bg-negative text-body-inverted">
        <h2 class="text-subtitle2 text-body-inverted">
          Deseja excluir o registro?
        </h2>
        <q-btn v-close-popup flat dense round icon="mdi-close" />
      </q-card-section>
      <q-card-section class="delete-action__content">
        <p class="text-caption no-margin">
          A exclusão é permanente e não pode ser desfeita. Certifique-se de que
          você realmente deseja prosseguir com esta ação.
        </p>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          :disable="state.isLoading"
          v-close-popup
          no-caps
          flat
          label="Cancelar"
          color="negative" />
        <q-btn
          :loading="state.isLoading"
          flat
          no-caps
          label="Excluir"
          color="negative"
          @click.stop="onConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.delete-action {
  &__wrapper {
    box-shadow: none;
    width: 20rem;
    max-width: 100%;
  }

  &__header {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
  }
}
</style>
