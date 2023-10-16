import { type HttpPostClient, HttpStatusCode } from '@/data/protocols'
import {
  type AuthenticateInputDto,
  type AuthenticateOutputDto
} from '@/domain/dto'
import { UnauthorizedException, UnexpectedException } from '@/domain/errors'
import {
  type AuthenticateUsecase,
  type StoreAuthTokenUsecase
} from '@/domain/usecases'

export class RemoteAuthenticate implements AuthenticateUsecase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<
      AuthenticateInputDto,
      AuthenticateOutputDto
    >,
    private readonly tokenStore: StoreAuthTokenUsecase
  ) {}

  async execute(props: AuthenticateInputDto): Promise<AuthenticateOutputDto> {
    const result = await this.httpClient.post({ url: this.url, body: props })

    switch (result.statusCode) {
      case HttpStatusCode.created:
        await this.tokenStore.store(result.body!)
        return result.body!

      case HttpStatusCode.unauthorized:
        throw new UnauthorizedException('E-mail e/ou senha inválidos')

      default:
        throw new UnexpectedException()
    }
  }
}
