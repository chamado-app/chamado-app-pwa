import { HttpStatusCode, type HttpGetClient } from '@/data/protocols'
import {
  type ListEquipmentsOutputDto,
  type ListEquipmentsInputDto
} from '@/domain/dto'
import { UnexpectedException } from '@/domain/errors'
import { type ListEquipmentsUsecase } from '@/domain/usecases'

import { parseRemoteEquipmentEntityToEquipmentEntity } from '../utils'
import { type RemoteListEquipmentDto } from './types'

export class RemoteListEquipmentsUsecase implements ListEquipmentsUsecase {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, RemoteListEquipmentDto>
  ) {}

  async execute(
    options: ListEquipmentsInputDto
  ): Promise<ListEquipmentsOutputDto> {
    const { skip, take, search } = options
    const { statusCode, body } = await this.httpGetClient.get({
      url: this.url,
      params: { skip, take, search }
    })

    switch (statusCode) {
      case HttpStatusCode.ok:
        if (!body) throw new UnexpectedException()
        return this.parse(body)

      default:
        throw new UnexpectedException()
    }
  }

  private parse(body: RemoteListEquipmentDto): ListEquipmentsOutputDto {
    const { equipments, ...rest } = body

    return {
      ...rest,
      equipments: equipments.map(parseRemoteEquipmentEntityToEquipmentEntity)
    }
  }
}
