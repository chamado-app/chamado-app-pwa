import { HttpStatusCode, type HttpGetClient } from '@/data/protocols'
import { type ListUsersOutputDto, type ListUsersInputDto } from '@/domain/dto'
import { UnexpectedException } from '@/domain/errors'
import { type ListUsersUsecase } from '@/domain/usecases'

import { parseRemoteUserEntityToUserEntity } from '../utils'
import { type RemoteListUsersDto } from './types'

export class RemoteListUsersUsecase implements ListUsersUsecase {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, RemoteListUsersDto>
  ) {}

  async execute(options: ListUsersInputDto): Promise<ListUsersOutputDto> {
    const { skip, take, search } = options
    const { statusCode, body } = await this.httpGetClient.get({
      url: this.url,
      params: { skip, take, search }
    })

    switch (statusCode) {
      case HttpStatusCode.ok:
        if (!body) throw new UnexpectedException()
        return this.parse(body)

      default:
        throw new UnexpectedException()
    }
  }

  private parse(body: RemoteListUsersDto): ListUsersOutputDto {
    const { users, ...rest } = body

    return {
      ...rest,
      users: users.map(parseRemoteUserEntityToUserEntity)
    }
  }
}
