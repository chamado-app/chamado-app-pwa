import { type Usecase } from '@/domain/base'
import { type TicketTextMessageFormEntity } from '@/domain/entities'

export interface SendTicketTextMessageUsecase extends Usecase<void> {
  execute: (
    ticketId: string,
    data: Partial<TicketTextMessageFormEntity>
  ) => Promise<void>
}
