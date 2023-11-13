import { HttpStatusCode, type HttpGetClient } from '@/data/protocols'
import {
  type ListTicketsOutputDto,
  type ListTicketsInputDto
} from '@/domain/dto'
import { UnexpectedException } from '@/domain/errors'
import { type ListTicketsUsecase } from '@/domain/usecases'

import { parseRemoteListTicketItemEntitytoListTicketItemEntity } from '../utils'
import { type RemoteListTicketDto } from './types'

export class RemoteListTicketsUsecase implements ListTicketsUsecase {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, RemoteListTicketDto>
  ) {}

  async execute(options: ListTicketsInputDto): Promise<ListTicketsOutputDto> {
    const { skip, take, search } = options
    const { statusCode, body } = await this.httpGetClient.get({
      url: this.url,
      params: { skip, take, search }
    })

    switch (statusCode) {
      case HttpStatusCode.ok:
        if (!body) throw new UnexpectedException()
        return this.parse(body)

      default:
        throw new UnexpectedException()
    }
  }

  private parse(body: RemoteListTicketDto): ListTicketsOutputDto {
    const { tickets, ...rest } = body

    return {
      ...rest,
      tickets: tickets.map(
        parseRemoteListTicketItemEntitytoListTicketItemEntity
      )
    }
  }
}
