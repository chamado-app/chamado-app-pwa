import { type ComputedRef } from 'vue'

import { type TicketEntity, type TicketStatus } from '@/domain/entities'

export interface TicketListController {
  tickets: TicketEntity[]
  title: ComputedRef<string>
}

export namespace TicketListController {
  export type RouteStatus = TicketStatus | 'all'
}
