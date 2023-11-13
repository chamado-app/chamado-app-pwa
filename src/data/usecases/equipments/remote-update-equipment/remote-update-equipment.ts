import { HttpStatusCode, type HttpPutClient } from '@/data/protocols'
import {
  parseRemoteEquipmentEntityToEquipmentEntity,
  type RemoteEquipmentEntity
} from '@/data/usecases'
import { type EquipmentEntity } from '@/domain/entities'
import {
  UnexpectedException,
  UnprocessableEntityException
} from '@/domain/errors'
import { type UpdateEquipmentUsecase } from '@/domain/usecases'

export class RemoteUpdateEquipmentUsecase implements UpdateEquipmentUsecase {
  constructor(
    private readonly url: string,
    private readonly httpPutClient: HttpPutClient<any, RemoteEquipmentEntity>
  ) {}

  async execute(
    id: string,
    data: Partial<EquipmentEntity>
  ): Promise<EquipmentEntity> {
    const url = `${this.url}/${id}`
    const result = await this.httpPutClient.put({ url, body: data })

    switch (result.statusCode) {
      case HttpStatusCode.ok:
        if (!result.body) throw new UnexpectedException()
        return parseRemoteEquipmentEntityToEquipmentEntity(result.body)

      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityException()

      default:
        throw new UnexpectedException()
    }
  }
}
