import { type Usecase } from '@/domain/base'

export interface ChangeTicketAssignedUsecase extends Usecase<void> {
  execute: (id: string, assignedToId: string) => Promise<void>
}
