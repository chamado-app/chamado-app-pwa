import { type ComputedRef } from 'vue'

import { type TicketEntity, type TicketStatus } from '@/domain/entities'

export type TicketsRouteStatus = TicketStatus | 'all'
export interface TicketListController {
  tickets: ComputedRef<TicketEntity[]>
  title: ComputedRef<string>
}
