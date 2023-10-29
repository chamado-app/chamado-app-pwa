import { type HttpGetClient, HttpStatusCode } from '@/data/protocols'
import { type ListInputDto } from '@/domain/base'
import { type ListCategoriesOutputDto } from '@/domain/dto'
import { UnexpectedException } from '@/domain/errors'
import { type ListCategoriesUsecase } from '@/domain/usecases'

import { parseRemoteCategoryEntityToCategoryEntity } from '../utils'
import { type RemoteListCategoriesDto } from './types'

export class RemoteListCategoriesUsecase implements ListCategoriesUsecase {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, RemoteListCategoriesDto>
  ) {}

  async execute(options: ListInputDto): Promise<ListCategoriesOutputDto> {
    const { skip, take, search } = options
    const { statusCode, body } = await this.httpGetClient.get({
      url: this.url,
      params: { skip, take, search }
    })

    switch (statusCode) {
      case HttpStatusCode.ok:
        return this.parse(body!)

      default:
        throw new UnexpectedException()
    }
  }

  private parse(body: RemoteListCategoriesDto): ListCategoriesOutputDto {
    const { categories, ...rest } = body

    return {
      ...rest,
      categories: categories.map(parseRemoteCategoryEntityToCategoryEntity)
    }
  }
}
