import { HttpStatusCode, type HttpGetClient } from '@/data/protocols'
import { type EquipmentEntity } from '@/domain/entities'
import { NotFoundException, UnexpectedException } from '@/domain/errors'
import { type ShowEquipmentUsecase } from '@/domain/usecases'

import { type RemoteEquipmentEntity } from '../types'
import { parseRemoteEquipmentEntityToEquipmentEntity } from '../utils'

export class RemoteShowEquipmentUsecase implements ShowEquipmentUsecase {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, RemoteEquipmentEntity>
  ) {}

  async execute(id: string): Promise<EquipmentEntity> {
    const url = `${this.url}/${id}`
    const { statusCode, body } = await this.httpGetClient.get({ url })

    switch (statusCode) {
      case HttpStatusCode.ok:
        if (!body) throw new UnexpectedException()
        return parseRemoteEquipmentEntityToEquipmentEntity(body)

      case HttpStatusCode.notFound:
        throw new NotFoundException()

      default:
        throw new UnexpectedException()
    }
  }
}
