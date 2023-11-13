import { type Usecase } from '@/domain/base'

export interface CompleteTicketUsecase extends Usecase<void> {
  execute: (id: string) => Promise<void>
}
