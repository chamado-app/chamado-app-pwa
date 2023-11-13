import { type HttpGetClient, HttpStatusCode } from '@/data/protocols'
import {
  parseRemoteUserEntityToUserEntity,
  type RemoteUserEntity
} from '@/data/usecases'
import { type UserEntity } from '@/domain/entities'
import { UnexpectedException } from '@/domain/errors'
import { type FetchUsersUsecase } from '@/domain/usecases'

export class RemoteFetchUsersUsecase implements FetchUsersUsecase {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, RemoteUserEntity[]>
  ) {}

  async execute(): Promise<UserEntity[]> {
    const { statusCode, body } = await this.httpGetClient.get({ url: this.url })

    switch (statusCode) {
      case HttpStatusCode.ok:
        return this.parse(body)

      default:
        throw new UnexpectedException()
    }
  }

  private parse(users?: RemoteUserEntity[]): UserEntity[] {
    if (!users?.length) return []

    return users.map(parseRemoteUserEntityToUserEntity)
  }
}
