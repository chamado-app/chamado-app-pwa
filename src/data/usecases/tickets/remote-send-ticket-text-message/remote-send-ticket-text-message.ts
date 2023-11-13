import { HttpStatusCode, type HttpPostClient } from '@/data/protocols'
import { type TicketTextMessageFormEntity } from '@/domain/entities'
import {
  UnexpectedException,
  UnprocessableEntityException
} from '@/domain/errors'
import { type SendTicketTextMessageUsecase } from '@/domain/usecases'

export class RemoteSendTicketTextMessageUsecase
  implements SendTicketTextMessageUsecase
{
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async execute(
    ticketId: string,
    data: Partial<TicketTextMessageFormEntity>
  ): Promise<void> {
    const url = this.url.replace(':id', ticketId)
    const result = await this.httpPostClient.post({ url, body: data })

    switch (result.statusCode) {
      case HttpStatusCode.created:
        return

      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityException()

      default:
        throw new UnexpectedException()
    }
  }
}
