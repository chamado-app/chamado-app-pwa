import { type HttpGetClient, HttpStatusCode } from '@/data/protocols'
import { type WhoAmIOutputDto } from '@/domain/dto'
import { UnauthorizedException, UnexpectedException } from '@/domain/errors'
import { type WhoAmIUsecase } from '@/domain/usecases'

export class RemoteWhoAmI implements WhoAmIUsecase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient<any, WhoAmIOutputDto>
  ) {}

  async execute(): Promise<WhoAmIOutputDto> {
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
