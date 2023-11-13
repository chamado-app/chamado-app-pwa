<script lang="ts" setup>
import { onUnmounted } from 'vue'

import { TicketForm, PageModalWrapper } from '@/presentation/components'
import {
  useCreateTicketController,
  useListTicketsController
} from '@/presentation/controllers'

const { loadTickets } = useListTicketsController()
const controller = useCreateTicketController({ loadTickets })
const { onClose, onSubmit, store } = controller

onUnmounted(() => {
  store.$reset()
})
</script>

<template>
  <PageModalWrapper
    :is-open="true"
    title="Abrir novo chamado"
    @on-close="onClose">
    <TicketForm @on-submit="onSubmit" @on-close="onClose" />
  </PageModalWrapper>
</template>
