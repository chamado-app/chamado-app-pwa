import { type HttpGetClient, HttpStatusCode } from '@/data/protocols'
import {
  parseRemoteCategoryEntityToCategoryEntity,
  type RemoteCategoryEntity
} from '@/data/usecases'
import { type CategoryEntity } from '@/domain/entities'
import { UnexpectedException } from '@/domain/errors'
import { type FetchCategoriesUsecase } from '@/domain/usecases'

export class RemoteFetchCategoriesUsecase implements FetchCategoriesUsecase {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, RemoteCategoryEntity[]>
  ) {}

  async execute(): Promise<CategoryEntity[]> {
    const { statusCode, body } = await this.httpGetClient.get({ url: this.url })

    switch (statusCode) {
      case HttpStatusCode.ok:
        return this.parse(body)

      default:
        throw new UnexpectedException()
    }
  }

  private parse(categories?: RemoteCategoryEntity[]): CategoryEntity[] {
    if (!categories?.length) return []

    return categories.map(parseRemoteCategoryEntityToCategoryEntity)
  }
}
