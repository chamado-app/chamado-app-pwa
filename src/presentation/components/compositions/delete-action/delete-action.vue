<script lang="ts" setup>
import { reactive } from 'vue'

import { ActionButton } from '@/presentation/components'

export type DeleteRegisterProps = {
  deleteHandler: () => Promise<void>
}

const state = reactive({
  isOpen: false,
  isLoading: false
})

const props = defineProps<DeleteRegisterProps>()
const emit = defineEmits<{ onDeleted: [] }>()

const resetState = (): void => {
  state.isLoading = false
  state.isOpen = false
}

const onOpen = (): void => {
  state.isOpen = true
}

const onClose = (): void => {
  resetState()
}

const onConfirm = async (): Promise<void> => {
  if (state.isLoading) return

  state.isLoading = true
  await props.deleteHandler()
  resetState()
  emit('onDeleted')
}
</script>

<template>
  <slot name="handler">
    <ActionButton icon="mdi-delete-outline" tooltip="Excluir" @click="onOpen" />
  </slot>
  <q-dialog v-model="state.isOpen" persistent>
    <q-card class="delete-action__wrapper">
      <q-card-section
        class="delete-action__header bg-negative text-body-inverted">
        <h2 class="text-subtitle2 text-body-inverted">
          Deseja excluir o registro?
        </h2>
        <q-btn flat dense round icon="mdi-close" @click.stop="onClose" />
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
          no-caps
          flat
          label="Cancelar"
          color="negative"
          @click.stop="onClose" />
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
