import type { TicketEntity, TicketStatus } from '@/domain/entities'

export interface ListTickets {
  list: () => Promise<ListTickets.Output>
}

export namespace ListTickets {
  export type Options = {
    status?: TicketStatus
  }

  export type Output = {
    data: TicketEntity[]
  }
}
