<script lang="ts" setup>
import { onUnmounted } from 'vue'

import {
  EquipmentForm,
  MobileDeleteAction,
  PageModalWrapper
} from '@/presentation/components'
import {
  useDeleteEquipmentController,
  useListEquipmentsController,
  useUpdateEquipmentController
} from '@/presentation/controllers'

const { loadEquipments } = useListEquipmentsController()
const controller = useUpdateEquipmentController({ loadEquipments })
const { deleteHandler } = useDeleteEquipmentController({ loadEquipments })
const { onClose, onSubmit, store, equipmentId } = controller

const onDelete = async (): Promise<void> => {
  await deleteHandler(equipmentId.value)
  onClose()
}

onUnmounted(() => {
  store.$reset()
})
</script>

<template>
  <PageModalWrapper
    :is-open="true"
    title="Atualizar equipamento"
    @on-close="onClose">
    <EquipmentForm is-update @on-submit="onSubmit" @on-close="onClose" />
    <MobileDeleteAction :delete-handler="onDelete" />
  </PageModalWrapper>
</template>
