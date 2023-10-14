import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useListTickets } from '@/main/factories'
import { useTickets } from '@/presentation/store'

import { type TicketListController } from './types'

export const useTicketListController = (): TicketListController => {
  const listTickets = useListTickets()
  const route = useRoute()
  const ticketsStore = useTickets()

  const doListTickets = async (): Promise<void> => {
    const { data } = await listTickets.list()

    ticketsStore.$patch({ data })
  }

  const titles: Record<TicketListController.RouteStatus, string> = {
    'in-progress': 'Chamados em andamento',
    done: 'Chamados concluídos',
    all: 'Todos os chamados'
  }

  const title = computed(
    () => titles[route.params.ticketStatus as TicketListController.RouteStatus]
  )

  const tickets = computed(() => ticketsStore.data)

  onMounted(doListTickets)

  return { tickets, title }
}
