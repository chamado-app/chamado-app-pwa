import { HttpStatusCode, type HttpPostClient } from '@/data/protocols'
import {
  parseRemoteCategoryEntityToCategoryEntity,
  type RemoteCategoryEntity
} from '@/data/usecases'
import { type CategoryEntity } from '@/domain/entities'
import {
  UnexpectedException,
  UnprocessableEntityException
} from '@/domain/errors'
import { type CreateCategoryUsecase } from '@/domain/usecases'

export class RemoteCreateCategoryUsecase implements CreateCategoryUsecase {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<any, RemoteCategoryEntity>
  ) {}

  async execute(data: Partial<CategoryEntity>): Promise<CategoryEntity> {
    const result = await this.httpPostClient.post({ url: this.url, body: data })

    switch (result.statusCode) {
      case HttpStatusCode.created:
        if (!result.body) throw new UnexpectedException()
        return parseRemoteCategoryEntityToCategoryEntity(result.body)

      case HttpStatusCode.ok:
        throw new UnprocessableEntityException()

      default:
        throw new UnexpectedException()
    }
  }
}
