import { type ComputedRef } from 'vue'

import { type TicketEntity } from '@/domain/entities'

export interface TicketListController {
  tickets: ComputedRef<TicketEntity[]>
}
