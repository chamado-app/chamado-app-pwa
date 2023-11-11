import { type Usecase } from '@/domain/base'
import { type DeleteUserInputDto } from '@/domain/dto'

export interface DeleteUserUsecase extends Usecase<void> {
  execute: (id: DeleteUserInputDto) => Promise<void>
}
