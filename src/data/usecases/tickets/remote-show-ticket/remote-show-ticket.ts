import { HttpStatusCode, type HttpGetClient } from '@/data/protocols'
import { type TicketEntity } from '@/domain/entities'
import { NotFoundException, UnexpectedException } from '@/domain/errors'
import { type ShowTicketUsecase } from '@/domain/usecases'

import { type RemoteTicketEntity } from '../types'
import { parseRemoteTicketEntityToTicketEntity } from '../utils'

export class RemoteShowTicketUsecase implements ShowTicketUsecase {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, RemoteTicketEntity>
  ) {}

  async execute(id: string): Promise<TicketEntity> {
    const url = `${this.url}/${id}`
    const { statusCode, body } = await this.httpGetClient.get({ url })

    switch (statusCode) {
      case HttpStatusCode.ok:
        if (!body) throw new UnexpectedException()
        return parseRemoteTicketEntityToTicketEntity(body)

      case HttpStatusCode.notFound:
        throw new NotFoundException()

      default:
        throw new UnexpectedException()
    }
  }
}
