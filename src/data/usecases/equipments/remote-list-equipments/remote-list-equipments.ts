import { faker } from '@faker-js/faker'

import {
  type HttpGetClient //  HttpStatusCode
} from '@/data/protocols'
import {
  type ListEquipmentsOutputDto,
  type ListEquipmentsInputDto
} from '@/domain/dto'
import { type EquipmentEntity, EquipmentStatus } from '@/domain/entities'
// import { UnexpectedException } from '@/domain/errors'
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
    // const { skip, take, search } = options
    // const { statusCode, body } = await this.httpGetClient.get({
    //   url: this.url,
    //   params: { skip, take, search }
    // })
    //
    // switch (statusCode) {
    //   case HttpStatusCode.ok:
    //     if (!body) throw new UnexpectedException()
    //     return this.parse(body)
    //
    //   default:
    //     throw new UnexpectedException()
    // }

    const total = faker.datatype.number({ min: 10, max: 100 })
    const equipments = Array.from(
      { length: options.take },
      (): EquipmentEntity => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        type: faker.commerce.product(),
        brand: faker.commerce.productMaterial(),
        model: faker.commerce.productAdjective(),
        section: faker.commerce.department(),
        serial: faker.random.alphaNumeric(12),
        patrimony: faker.random.alphaNumeric(4),
        status: faker.helpers.arrayElement(Object.values(EquipmentStatus)),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
      })
    )

    return await Promise.resolve({
      take: options.take,
      skip: options.skip,
      total,
      equipments
    })
  }

  private parse(body: RemoteListEquipmentDto): ListEquipmentsOutputDto {
    const { equipments, ...rest } = body

    return {
      ...rest,
      equipments: equipments.map(parseRemoteEquipmentEntityToEquipmentEntity)
    }
  }
}
