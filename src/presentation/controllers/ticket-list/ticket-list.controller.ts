import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { type TicketEntity } from '@/domain/entities'

import { type TicketListController } from './types'

export const useTicketListController = (): TicketListController => {
  const route = useRoute()
  const tickets: TicketEntity[] = []

  const titles: Record<TicketListController.RouteStatus, string> = {
    'in-progress': 'Chamados em andamento',
    done: 'Chamados concluídos',
    all: 'Todos os chamados'
  }

  const title = computed(
    () => titles[route.params.ticketStatus as TicketListController.RouteStatus]
  )

  return { tickets, title }
}
