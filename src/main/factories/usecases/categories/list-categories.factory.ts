import { constants } from '@/constants'
import { RemoteListCategoriesUsecase } from '@/data/usecases'
import { type ListCategoriesUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useListCategoriesUsecase = (): ListCategoriesUsecase =>
  new RemoteListCategoriesUsecase(
    useApiUrl(constants.urls.categories),
    useAuthorizeHttpClient()
  )
