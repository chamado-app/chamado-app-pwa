import { HttpStatusCode, type HttpPutClient } from '@/data/protocols'
import {
  parseRemoteCategoryEntityToCategoryEntity,
  type RemoteCategoryEntity
} from '@/data/usecases'
import { type CategoryEntity } from '@/domain/entities'
import {
  UnexpectedException,
  UnprocessableEntityException
} from '@/domain/errors'
import { type UpdateCategoryUsecase } from '@/domain/usecases'

export class RemoteUpdateCategoryUsecase implements UpdateCategoryUsecase {
  constructor(
    private readonly url: string,
    private readonly httpPutClient: HttpPutClient<any, RemoteCategoryEntity>
  ) {}

  async execute(
    id: string,
    data: Partial<CategoryEntity>
  ): Promise<CategoryEntity> {
    const url = `${this.url}/${id}`
    const result = await this.httpPutClient.put({ url, body: data })

    switch (result.statusCode) {
      case HttpStatusCode.ok:
        if (!result.body) throw new UnexpectedException()
        return parseRemoteCategoryEntityToCategoryEntity(result.body)

      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityException()

      default:
        throw new UnexpectedException()
    }
  }
}
