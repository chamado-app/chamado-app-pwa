import { HttpStatusCode, type HttpGetClient } from '@/data/protocols'
import { type CategoryEntity } from '@/domain/entities'
import { NotFoundException, UnexpectedException } from '@/domain/errors'
import { type ShowCategoryUsecase } from '@/domain/usecases'

import { type RemoteCategoryEntity } from '../types'
import { parseRemoteCategoryEntityToCategoryEntity } from '../utils'

export class RemoteShowCategoryUsecase implements ShowCategoryUsecase {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, RemoteCategoryEntity>
  ) {}

  async execute(id: string): Promise<CategoryEntity> {
    const url = `${this.url}/${id}`
    const { statusCode, body } = await this.httpGetClient.get({ url })

    switch (statusCode) {
      case HttpStatusCode.ok:
        return parseRemoteCategoryEntityToCategoryEntity(body!)

      case HttpStatusCode.notFound:
        throw new NotFoundException()

      default:
        throw new UnexpectedException()
    }
  }
}
