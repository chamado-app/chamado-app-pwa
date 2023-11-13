import { type ComputedRef } from 'vue'

import { type useShowTicketStore } from '@/presentation/store'

export interface ShowTicketController {
  loadTicket: () => Promise<void>
  ticketId: ComputedRef<string>
  store: ReturnType<typeof useShowTicketStore>
}
