import { computed, inject, onMounted } from 'vue'

import { type ListTicketsUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useTickets } from '@/presentation/store'

import { type TicketListController } from './types'

export const useTicketListController = (): TicketListController => {
  const listTicketsUsecase = inject<ListTicketsUsecase>(
    PROVIDERS.LIST_TICKETS_USECASE
  )!
  const ticketsStore = useTickets()

  const doListTickets = async (): Promise<void> => {
    const { tickets } = await listTicketsUsecase.execute()

    ticketsStore.$patch({ tickets })
  }

  const tickets = computed(() => ticketsStore.tickets)

  onMounted(doListTickets)

  return { tickets }
}
