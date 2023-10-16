import type { TicketEntity, TicketStatus } from '@/domain/entities'

export interface ListTicketsUsecase {
  list: () => Promise<ListTicketsUsecase.Output>
}

export namespace ListTicketsUsecase {
  export type Options = {
    status?: TicketStatus
  }

  export type Output = {
    tickets: TicketEntity[]
  }
}
