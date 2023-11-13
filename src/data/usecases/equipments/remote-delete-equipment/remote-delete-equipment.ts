import { type HttpDeleteClient, HttpStatusCode } from '@/data/protocols'
import { UnexpectedException } from '@/domain/errors'
import { type DeleteEquipmentUsecase } from '@/domain/usecases'

export class RemoteDeleteEquipmentUsecase implements DeleteEquipmentUsecase {
  constructor(
    private readonly url: string,
    private readonly httpDeleteClient: HttpDeleteClient
  ) {}

  async execute(id: string): Promise<void> {
    const url = `${this.url}/${id}`
    const { statusCode } = await this.httpDeleteClient.delete({ url })

    switch (statusCode) {
      case HttpStatusCode.noContent:
        return

      default:
        throw new UnexpectedException()
    }
  }
}
