import { computed, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { type ListTicketsUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useTickets } from '@/presentation/store'

import { type TicketListController, type TicketsRouteStatus } from './types'

export const useTicketListController = (): TicketListController => {
  const listTicketsUsecase = inject<ListTicketsUsecase>(
    PROVIDERS.LIST_TICKETS_USECASE
  )!
  const route = useRoute()
  const ticketsStore = useTickets()

  const doListTickets = async (): Promise<void> => {
    const { tickets } = await listTicketsUsecase.execute()

    ticketsStore.$patch({ tickets })
  }

  const titles: Record<TicketsRouteStatus, string> = {
    'in-progress': 'Chamados em andamento',
    done: 'Chamados concluídos',
    all: 'Todos os chamados'
  }

  const title = computed(
    () => titles[route.params.ticketStatus as TicketsRouteStatus]
  )

  const tickets = computed(() => ticketsStore.tickets)

  onMounted(doListTickets)

  return { tickets, title }
}
