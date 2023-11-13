import { type Usecase } from '@/domain/base'
import { type TicketEntity } from '@/domain/entities'

export interface ShowTicketUsecase extends Usecase<TicketEntity> {
  execute: (id: string) => Promise<TicketEntity>
}
