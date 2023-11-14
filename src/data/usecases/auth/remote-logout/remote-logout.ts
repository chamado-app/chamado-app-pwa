import { HttpStatusCode, type HttpPostClient } from '@/data/protocols'
import { UnexpectedException } from '@/domain/errors'
import { type LogoutUsecase } from '@/domain/usecases'

export class RemoteLogoutUsecase implements LogoutUsecase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient
  ) {}

  async execute(): Promise<void> {
    const { statusCode } = await this.httpClient.post({ url: this.url })

    switch (statusCode) {
      case HttpStatusCode.noContent:
        return

      default:
        throw new UnexpectedException()
    }
  }
}
