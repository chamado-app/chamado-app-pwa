import { HttpStatusCode, type HttpPutClient } from '@/data/protocols'
import { NotFoundException, UnexpectedException } from '@/domain/errors'
import { type ChangeTicketAssignedUsecase } from '@/domain/usecases'

export class RemoteChangeTicketAssignedUsecase
  implements ChangeTicketAssignedUsecase
{
  constructor(
    private readonly url: string,
    private readonly httpPutClient: HttpPutClient
  ) {}

  async execute(id: string, assignedToId: string): Promise<void> {
    const url = this.url.replace(':id', id)
    const body = { assignedToId }
    const { statusCode } = await this.httpPutClient.put({ url, body })

    switch (statusCode) {
      case HttpStatusCode.ok:
        return

      case HttpStatusCode.notFound:
        throw new NotFoundException()

      default:
        throw new UnexpectedException()
    }
  }
}
