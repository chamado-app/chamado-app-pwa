import { HttpStatusCode, type HttpPutClient } from '@/data/protocols'
import {
  parseRemoteUserEntityToUserEntity,
  type RemoteUserEntity
} from '@/data/usecases'
import { type UserEntity } from '@/domain/entities'
import {
  UnexpectedException,
  UnprocessableEntityException
} from '@/domain/errors'
import { type UpdateUserUsecase } from '@/domain/usecases'

export class RemoteUpdateUserUsecase implements UpdateUserUsecase {
  constructor(
    private readonly url: string,
    private readonly httpPutClient: HttpPutClient<any, RemoteUserEntity>
  ) {}

  async execute(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    const url = `${this.url}/${id}`
    const result = await this.httpPutClient.put({ url, body: data })

    switch (result.statusCode) {
      case HttpStatusCode.ok:
        if (!result.body) throw new UnexpectedException()
        return parseRemoteUserEntityToUserEntity(result.body)

      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityException()

      default:
        throw new UnexpectedException()
    }
  }
}
