import { HttpStatusCode, type HttpPostClient } from '@/data/protocols'
import { type RemoteTicketEntity } from '@/data/usecases'
import { type TicketEntity, type CreateTicketEntity } from '@/domain/entities'
import {
  UnexpectedException,
  UnprocessableEntityException
} from '@/domain/errors'
import { type CreateTicketUsecase } from '@/domain/usecases'

import { parseRemoteTicketEntityToTicketEntity } from '../utils'

export class RemoteCreateTicketUsecase implements CreateTicketUsecase {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<any, RemoteTicketEntity>
  ) {}

  async execute(data: Partial<CreateTicketEntity>): Promise<TicketEntity> {
    const result = await this.httpPostClient.post({ url: this.url, body: data })

    switch (result.statusCode) {
      case HttpStatusCode.created:
        if (!result.body) throw new UnexpectedException()
        return parseRemoteTicketEntityToTicketEntity(result.body)

      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityException()

      default:
        throw new UnexpectedException()
    }
  }
}
