import { HttpStatusCode, type HttpGetClient } from '@/data/protocols'
import { type UserEntity } from '@/domain/entities'
import { NotFoundException, UnexpectedException } from '@/domain/errors'
import { type ShowUserUsecase } from '@/domain/usecases'

import { type RemoteUserEntity } from '../types'
import { parseRemoteUserEntityToUserEntity } from '../utils'

export class RemoteShowUserUsecase implements ShowUserUsecase {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, RemoteUserEntity>
  ) {}

  async execute(id: string): Promise<UserEntity> {
    const url = `${this.url}/${id}`
    const { statusCode, body } = await this.httpGetClient.get({ url })

    switch (statusCode) {
      case HttpStatusCode.ok:
        return parseRemoteUserEntityToUserEntity(body!)

      case HttpStatusCode.notFound:
        throw new NotFoundException()

      default:
        throw new UnexpectedException()
    }
  }
}
