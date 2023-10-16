import { type HttpGetClient } from '@/data/protocols'
import {
  type ListTicketsInputDto,
  type ListTicketsOutputDto
} from '@/domain/dto'
import type { ListTicketsUsecase } from '@/domain/usecases'

export class RemoteListTickets implements ListTicketsUsecase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient<
      ListTicketsInputDto,
      ListTicketsOutputDto
    >
  ) {}

  async execute(): Promise<ListTicketsOutputDto> {
    const { body } = await this.httpClient.get({ url: this.url })

    return { tickets: body?.tickets ?? [] }
  }
}
