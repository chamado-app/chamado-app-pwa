import { constants } from '@/constants'
import { RemoteUpdateCategoryUsecase } from '@/data/usecases'
import { type UpdateCategoryUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useUpdateCategoryUsecase = (): UpdateCategoryUsecase =>
  new RemoteUpdateCategoryUsecase(
    useApiUrl(constants.urls.categories),
    useAuthorizeHttpClient()
  )
