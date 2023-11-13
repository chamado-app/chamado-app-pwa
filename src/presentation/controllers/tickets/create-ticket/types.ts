import { type ListTicketsController } from '@/presentation/controllers'
import { type useCreateTicketStore } from '@/presentation/store'

export type CreateTicketControllerProps = {
  loadTickets: ListTicketsController['loadTickets']
}

export interface CreateTicketController {
  onSubmit: () => Promise<void>
  onClose: () => void
  store: ReturnType<typeof useCreateTicketStore>
}
