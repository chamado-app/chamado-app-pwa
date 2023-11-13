import { HttpStatusCode, type HttpPutClient } from '@/data/protocols'
import { NotFoundException, UnexpectedException } from '@/domain/errors'
import { type CompleteTicketUsecase } from '@/domain/usecases'

export class RemoteCompleteTicketUsecase implements CompleteTicketUsecase {
  constructor(
    private readonly url: string,
    private readonly httpPutClient: HttpPutClient
  ) {}

  async execute(id: string): Promise<void> {
    const url = this.url.replace(':id', id)
    const { statusCode } = await this.httpPutClient.put({ url })

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
