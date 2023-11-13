import { type useShowTicketStore } from '@/presentation/store'

export interface ShowTicketController {
  loadTicket: () => Promise<void>
  onClose: () => void
  store: ReturnType<typeof useShowTicketStore>
}
