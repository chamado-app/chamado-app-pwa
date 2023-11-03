import { faker } from '@faker-js/faker'

import {
  type HttpGetClient //  HttpStatusCode
} from '@/data/protocols'
import { type ListUsersOutputDto, type ListUsersInputDto } from '@/domain/dto'
import { Role, type UserEntity } from '@/domain/entities'
// import { UnexpectedException } from '@/domain/errors'
import { type ListUsersUsecase } from '@/domain/usecases'

import { parseRemoteUserEntityToUserEntity } from '../utils'
import { type RemoteListUsersDto } from './types'

export class RemoteListUsersUsecase implements ListUsersUsecase {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, RemoteListUsersDto>
  ) {}

  async execute(options: ListUsersInputDto): Promise<ListUsersOutputDto> {
    // const { skip, take, search } = options
    // const { statusCode, body } = await this.httpGetClient.get({
    //   url: this.url,
    //   params: { skip, take, search }
    // })
    //
    // switch (statusCode) {
    //   case HttpStatusCode.ok:
    //     if (!body) throw new UnexpectedException()
    //     return this.parse(body)
    //
    //   default:
    //     throw new UnexpectedException()
    // }

    const total = faker.datatype.number({ min: 10, max: 100 })
    const users = Array.from({ length: options.take }, (): UserEntity => {
      const firstName = faker.name.firstName()
      const lastName = faker.name.lastName()
      const email = faker.internet.email(firstName, lastName, 'chamado.app')

      return {
        id: faker.datatype.uuid(),
        firstName,
        lastName,
        email,
        password: null,
        isActive: faker.datatype.boolean(),
        roles: [faker.helpers.arrayElement(Object.values(Role))],
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
      }
    })

    return await Promise.resolve({
      take: options.take,
      skip: options.skip,
      total,
      users
    })
  }

  private parse(body: RemoteListUsersDto): ListUsersOutputDto {
    const { users, ...rest } = body

    return {
      ...rest,
      users: users.map(parseRemoteUserEntityToUserEntity)
    }
  }
}
