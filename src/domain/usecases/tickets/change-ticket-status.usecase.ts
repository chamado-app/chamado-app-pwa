import { type Usecase } from '@/domain/base'
import { type TicketStatus } from '@/domain/entities'

export interface ChangeTicketStatusUsecase extends Usecase<void> {
  execute: (id: string, status: TicketStatus) => Promise<void>
}
