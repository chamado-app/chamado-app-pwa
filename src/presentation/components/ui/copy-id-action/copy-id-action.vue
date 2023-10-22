<script lang="ts" setup>
import { copyToClipboard } from 'quasar'
import { computed, inject } from 'vue'

import { type Notifier } from '@/data/protocols'
import { PROVIDERS } from '@/presentation/providers'

const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!

const props = defineProps<{ value: string }>()
const croppedValue = computed(() => props.value.split('-')[0])
const copy = async (): Promise<void> => {
  try {
    await copyToClipboard(props.value)
    notifier.success({ message: 'Copiado com sucesso!' })
  } catch {
    notifier.error({ message: 'Ocorreu um erro ao copiar!' })
  }
}
</script>

<template>
  <q-td>
    <q-btn
      class="text-weight-regular copy-id-action__button"
      color="secondary"
      flat
      dense
      rounded
      size="md"
      @click.prevent.stop="copy">
      <template #default>
        <div class="text-body copy-id-action__content">
          {{ croppedValue }}
          <q-icon name="mdi-content-copy" size="xs" />
        </div>
        <q-tooltip anchor="top middle" self="bottom middle"> Copiar </q-tooltip>
      </template>
    </q-btn>
  </q-td>
</template>

<style lang="scss">
.copy-id-action {
  &__button {
    z-index: 2;
  }

  &__content {
    display: grid;
    grid-gap: 0.25rem;
    grid-auto-flow: column;
    align-items: center;
    font-size: 13px;
  }
}
</style>
