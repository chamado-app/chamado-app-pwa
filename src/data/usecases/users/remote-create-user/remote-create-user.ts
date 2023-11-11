import { HttpStatusCode, type HttpPostClient } from '@/data/protocols'
import {
  parseRemoteUserEntityToUserEntity,
  type RemoteUserEntity
} from '@/data/usecases'
import { type UserEntity } from '@/domain/entities'
import {
  UnexpectedException,
  UnprocessableEntityException
} from '@/domain/errors'
import { type CreateUserUsecase } from '@/domain/usecases'

export class RemoteCreateUserUsecase implements CreateUserUsecase {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<any, RemoteUserEntity>
  ) {}

  async execute(data: Partial<UserEntity>): Promise<UserEntity> {
    const result = await this.httpPostClient.post({ url: this.url, body: data })

    switch (result.statusCode) {
      case HttpStatusCode.created:
        if (!result.body) throw new UnexpectedException()
        return parseRemoteUserEntityToUserEntity(result.body)

      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityException()

      default:
        throw new UnexpectedException()
    }
  }
}
