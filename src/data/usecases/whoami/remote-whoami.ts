import { type HttpGetClient, HttpStatusCode } from '@/data/protocols'
import { UnauthorizedException, UnexpectedException } from '@/domain/errors'
import { type WhoAmIUsecase } from '@/domain/usecases'

export class RemoteWhoAmI implements WhoAmIUsecase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient<
      WhoAmIUsecase.Input,
      WhoAmIUsecase.Output
    >
  ) {}

  async execute(): Promise<WhoAmIUsecase.Output> {
    const result = await this.httpClient.get({ url: this.url })

    switch (result.statusCode) {
      case HttpStatusCode.ok:
        return result.body!

      case HttpStatusCode.unauthorized:
        throw new UnauthorizedException('Login inválido')

      default:
        throw new UnexpectedException()
    }
  }
}
