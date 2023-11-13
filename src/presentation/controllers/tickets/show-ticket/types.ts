import { type ComputedRef } from 'vue'

import { type useShowTicketStore } from '@/presentation/store'

export interface ShowTicketController {
  loadTicket: (quiet?: boolean) => Promise<void>
  ticketId: ComputedRef<string>
  store: ReturnType<typeof useShowTicketStore>
}
