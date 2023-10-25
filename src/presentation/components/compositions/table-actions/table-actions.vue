<script lang="ts" setup>
import { DeleteAction } from '@/presentation/components'

export type TableActionsProp = {
  deleteHandler?: () => Promise<void>
}

defineEmits(['onDeleted'])
defineProps<TableActionsProp>()
</script>

<template>
  <div class="table-actions">
    <DeleteAction
      v-if="!!deleteHandler"
      :delete-handler="deleteHandler"
      @on-deleted="() => $emit('onDeleted')" />
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
