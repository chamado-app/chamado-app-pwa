import { type HttpGetClient, HttpStatusCode } from '@/data/protocols'
import {
  parseRemoteEquipmentEntityToEquipmentEntity,
  type RemoteEquipmentEntity
} from '@/data/usecases'
import { type EquipmentEntity } from '@/domain/entities'
import { UnexpectedException } from '@/domain/errors'
import { type FetchEquipmentsUsecase } from '@/domain/usecases'

export class RemoteFetchEquipmentsUsecase implements FetchEquipmentsUsecase {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, RemoteEquipmentEntity[]>
  ) {}

  async execute(): Promise<EquipmentEntity[]> {
    const { statusCode, body } = await this.httpGetClient.get({ url: this.url })

    switch (statusCode) {
      case HttpStatusCode.ok:
        return this.parse(body)

      default:
        throw new UnexpectedException()
    }
  }

  private parse(equipments?: RemoteEquipmentEntity[]): EquipmentEntity[] {
    if (!equipments?.length) return []

    return equipments.map(parseRemoteEquipmentEntityToEquipmentEntity)
  }
}
