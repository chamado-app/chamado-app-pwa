import { constants } from '@/constants'
import { RemoteShowCategoryUsecase } from '@/data/usecases'
import { type ShowCategoryUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useShowCategoryUsecase = (): ShowCategoryUsecase =>
  new RemoteShowCategoryUsecase(
    useApiUrl(constants.urls.categories),
    useAuthorizeHttpClient()
  )
