import { constants } from '@/constants'
import { RemoteDeleteCategoryUsecase } from '@/data/usecases'
import { type DeleteCategoryUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useDeleteCategoryUsecase = (): DeleteCategoryUsecase =>
  new RemoteDeleteCategoryUsecase(
    useApiUrl(constants.urls.categories),
    useAuthorizeHttpClient()
  )
