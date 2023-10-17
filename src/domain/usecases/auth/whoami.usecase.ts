import { type Usecase } from '@/domain/base'
import { type WhoAmIOutputDto } from '@/domain/dto'

export interface WhoAmIUsecase extends Usecase<WhoAmIOutputDto> {
  execute: () => Promise<WhoAmIOutputDto>
}
