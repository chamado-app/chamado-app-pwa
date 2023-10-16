import { type HttpGetClient } from '@/data/protocols'
import type { ListTicketsUsecase } from '@/domain/usecases'

export class RemoteListTickets implements ListTicketsUsecase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient<
      ListTicketsUsecase.Options,
      ListTicketsUsecase.Output
    >
  ) {}

  async list(): Promise<ListTicketsUsecase.Output> {
    const { body } = await this.httpClient.get({ url: this.url })

    return { tickets: body?.tickets ?? [] }
  }
}
