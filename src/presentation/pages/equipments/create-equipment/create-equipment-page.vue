<script lang="ts" setup>
import { onUnmounted } from 'vue'

import { EquipmentForm, PageModalWrapper } from '@/presentation/components'
import {
  useCreateEquipmentController,
  useListEquipmentsController
} from '@/presentation/controllers'

const { loadEquipments } = useListEquipmentsController()
const controller = useCreateEquipmentController({ loadEquipments })
const { onClose, onSubmit, store } = controller

onUnmounted(() => {
  store.$reset()
})
</script>

<template>
  <PageModalWrapper
    :is-open="true"
    title="Cadastrar equipamento"
    @on-close="onClose">
    <EquipmentForm @on-submit="onSubmit" @on-close="onClose" />
  </PageModalWrapper>
</template>
