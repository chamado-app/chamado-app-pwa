import { type Usecase } from '@/domain/base'

export interface CancelTicketUsecase extends Usecase<void> {
  execute: (id: string) => Promise<void>
}
