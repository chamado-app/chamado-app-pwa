<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { CreateFloatButton, TicketItem } from '@/presentation/components'

const route = useRoute()

const titles: Record<string, string> = {
  'in-progress': 'Chamados em andamento',
  completed: 'Chamados concluídos',
  all: 'Todos os chamados'
}

const title = computed(() => titles[route.params.ticketStatus as string])

const tickets = [
  {
    code: '0001',
    id: 1,
    title: 'Problemas no office',
    status: 'aberto',
    lastMessage: {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      date: new Date().setDate(new Date().getDate() - 2)
    },
    totalMessages: 5
  },
  {
    code: '0002',
    id: 2,
    title: 'Problemas no windows',
    status: 'respondido',
    lastMessage: {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      date: new Date().setHours(new Date().getHours() - 2)
    },
    totalMessages: 3
  },
  {
    code: '0003',
    id: 3,
    title: 'Problemas no teclado',
    status: 'concluido',
    lastMessage: {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      date: new Date().setMinutes(new Date().getMinutes() - 2)
    },
    totalMessages: 7
  }
]
</script>

<template>
  <h2 class="text-h6 q-mb-md">{{ title }}</h2>
  <div class="ticket-list__wrapper">
    <q-list class="ticket-list__content">
      <TicketItem v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
    </q-list>
  </div>
  <CreateFloatButton />
</template>

<style lang="scss" scoped>
.ticket-list {
  &__content {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 0.75rem;
  }
}
</style>
