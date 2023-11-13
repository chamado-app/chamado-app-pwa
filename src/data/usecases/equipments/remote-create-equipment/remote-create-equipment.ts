import { HttpStatusCode, type HttpPostClient } from '@/data/protocols'
import {
  type RemoteEquipmentEntity,
  parseRemoteEquipmentEntityToEquipmentEntity
} from '@/data/usecases'
import { type EquipmentEntity } from '@/domain/entities'
import {
  UnexpectedException,
  UnprocessableEntityException
} from '@/domain/errors'
import { type CreateEquipmentUsecase } from '@/domain/usecases'

export class RemoteCreateEquipmentUsecase implements CreateEquipmentUsecase {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<any, RemoteEquipmentEntity>
  ) {}

  async execute(data: Partial<EquipmentEntity>): Promise<EquipmentEntity> {
    const result = await this.httpPostClient.post({ url: this.url, body: data })

    switch (result.statusCode) {
      case HttpStatusCode.created:
        if (!result.body) throw new UnexpectedException()
        return parseRemoteEquipmentEntityToEquipmentEntity(result.body)

      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityException()

      default:
        throw new UnexpectedException()
    }
  }
}
