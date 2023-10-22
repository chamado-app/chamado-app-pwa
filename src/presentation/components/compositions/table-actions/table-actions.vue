<script lang="ts" setup>
import { ActionButton } from '@/presentation/components/ui'

export type TableActionsProp = {
  noEdit?: boolean
  noDelete?: boolean
}

defineEmits(['edit', 'delete'])
defineProps<TableActionsProp>()
</script>

<template>
  <q-td>
    <div class="table-actions">
      <ActionButton
        v-if="!noEdit"
        icon="mdi-pencil-outline"
        tooltip="Editar"
        @click="() => $emit('edit')" />

      <ActionButton
        v-if="!noDelete"
        icon="mdi-delete-outline"
        tooltip="Deletar"
        @click="() => $emit('delete')" />
    </div>
  </q-td>
</template>

<style lang="scss">
.table-actions {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.25rem;
  grid-auto-columns: max-content;
  grid-auto-rows: max-content;
  justify-content: center;
}
</style>
