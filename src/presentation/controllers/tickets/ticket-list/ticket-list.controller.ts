import { computed, inject, onMounted } from 'vue'

import { type ListTicketsUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useListTicketsStore } from '@/presentation/store'

import { type TicketListController } from './types'

export const useTicketListController = (): TicketListController => {
  const listTicketsUsecase = inject<ListTicketsUsecase>(
    PROVIDERS.LIST_TICKETS_USECASE
  )!
  const ticketsStore = useListTicketsStore()

  const doListTickets = async (): Promise<void> => {
    const { tickets: data } = await listTicketsUsecase.execute()

    ticketsStore.$patch({ data })
  }

  const tickets = computed(() => ticketsStore.data)

  onMounted(doListTickets)

  return { tickets }
}
