import { constants } from '@/constants'
import { RemoteCreateCategoryUsecase } from '@/data/usecases'
import { type CreateCategoryUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useCreateCategoryUsecase = (): CreateCategoryUsecase =>
  new RemoteCreateCategoryUsecase(
    useApiUrl(constants.urls.categories),
    useAuthorizeHttpClient()
  )
