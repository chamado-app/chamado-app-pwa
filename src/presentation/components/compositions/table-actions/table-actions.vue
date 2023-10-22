<script lang="ts" setup>
import { ActionButton } from '@/presentation/components/ui'

export type TableActionsProp = {
  noDelete?: boolean
}

defineEmits(['delete'])
defineProps<TableActionsProp>()
</script>

<template>
  <div class="table-actions">
    <ActionButton
      v-if="!noDelete"
      icon="mdi-delete-outline"
      tooltip="Deletar"
      @click="() => $emit('delete')" />
  </div>
</template>

<style lang="scss">
.table-actions {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.25rem;
  grid-auto-columns: max-content;
  grid-auto-rows: max-content;
  align-content: center;
  align-items: center;
  justify-content: end;
  width: max-content;
  height: 100%;
  margin-right: 0.5rem;
  margin-left: auto;
  z-index: 2;
}
</style>
