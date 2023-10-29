<script setup lang="ts">
import { PageWrapper } from '@/presentation/components'

export type PageModalWrapperProps = {
  title: string
  isOpen: boolean
}

defineProps<PageModalWrapperProps>()
defineEmits<{ onClose: [] }>()
</script>

<template>
  <q-dialog :model-value="isOpen" persistent no-backdrop-dismiss>
    <q-card class="page-modal__wrapper">
      <q-card-section class="page-modal__container">
        <PageWrapper is-modal :title="title">
          <template #title-append>
            <q-btn
              flat
              round
              icon="mdi-close"
              dense
              @click.stop="() => $emit('onClose')" />
          </template>
          <slot />
        </PageWrapper>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
.page-modal {
  &__wrapper {
    width: 100%;
    max-width: 60rem;
  }

  &__container {
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: max-content;
    gap: 1.5rem;
  }
}
</style>
