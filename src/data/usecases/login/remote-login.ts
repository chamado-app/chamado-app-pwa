import { type HttpPostClient, HttpStatusCode } from '@/data/protocols'
import { type Login } from '@/domain/usecases'

export class RemoteLogin implements Login {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<Login.Input, Login.Output>
  ) {}

  async execute(props: Login.Input): Promise<Login.Output> {
    const result = await this.httpClient.post({ url: this.url, body: props })

    switch (result.statusCode) {
      case HttpStatusCode.ok:
        return result.body!

      case HttpStatusCode.unauthorized:
        throw new Error()

      default:
        throw new Error()
    }
  }
}
