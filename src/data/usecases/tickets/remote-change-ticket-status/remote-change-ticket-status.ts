import { HttpStatusCode, type HttpPutClient } from '@/data/protocols'
import { type TicketStatus } from '@/domain/entities'
import {
  ForbiddenException,
  NotFoundException,
  UnexpectedException
} from '@/domain/errors'
import { type ChangeTicketStatusUsecase } from '@/domain/usecases'

export class RemoteChangeTicketStatusUsecase
  implements ChangeTicketStatusUsecase
{
  constructor(
    private readonly url: string,
    private readonly httpPutClient: HttpPutClient
  ) {}

  async execute(id: string, status: TicketStatus): Promise<void> {
    const url = `${this.url}/${id}`
    const body = { status }
    const { statusCode } = await this.httpPutClient.put({ url, body })

    switch (statusCode) {
      case HttpStatusCode.ok:
        return

      case HttpStatusCode.notFound:
        throw new NotFoundException()

      case HttpStatusCode.forbidden:
        throw new ForbiddenException(
          'Sem permissão para alterar o status do chamado'
        )

      default:
        throw new UnexpectedException()
    }
  }
}
