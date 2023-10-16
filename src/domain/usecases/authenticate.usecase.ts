import { type Usecase } from '@/domain/base'
import {
  type AuthenticateInputDto,
  type AuthenticateOutputDto
} from '@/domain/dto'

export interface AuthenticateUsecase extends Usecase<AuthenticateOutputDto> {
  execute: (props: AuthenticateInputDto) => Promise<AuthenticateOutputDto>
}
