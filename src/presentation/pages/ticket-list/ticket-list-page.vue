<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { TicketCard } from '@/presentation/components'

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
  <h2 class="text-h6">{{ title }}</h2>
  <div class="ticket-list__wrapper">
    <QRow>
      <QCol v-for="ticket in tickets" :key="ticket.code">
        <TicketCard :ticket="ticket" />
      </QCol>
    </QRow>
  </div>
</template>

<style lang="scss" scoped>
.ticket-list {
  &__wrapper {
    margin-top: 1rem;
  }
}
</style>
