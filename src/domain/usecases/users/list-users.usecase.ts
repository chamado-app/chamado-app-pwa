import { type Usecase } from '@/domain/base'
import { type ListUsersInputDto, type ListUsersOutputDto } from '@/domain/dto'

export interface ListUsersUsecase extends Usecase<ListUsersOutputDto> {
  execute: (options: ListUsersInputDto) => Promise<ListUsersOutputDto>
}
