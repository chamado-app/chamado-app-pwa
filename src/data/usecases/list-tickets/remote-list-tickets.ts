import { type HttpGetClient } from '@/data/protocols'
import type { ListTickets } from '@/domain/usecases'

export class RemoteListTickets implements ListTickets {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient<
      ListTickets.Options,
      ListTickets.Output
    >
  ) {}

  async list(): Promise<ListTickets.Output> {
    const { body } = await this.httpClient.get({ url: this.url })

    return { data: body?.data ?? [] }
  }
}
