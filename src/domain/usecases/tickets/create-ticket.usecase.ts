import { type Usecase } from '@/domain/base'
import { type TicketEntity, type CreateTicketEntity } from '@/domain/entities'

export interface CreateTicketUsecase extends Usecase<TicketEntity> {
  execute: (data: Partial<CreateTicketEntity>) => Promise<TicketEntity>
}
