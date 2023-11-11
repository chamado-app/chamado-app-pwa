import { constants } from '@/constants'
import { RemoteFetchCategoriesUsecase } from '@/data/usecases'
import { type FetchCategoriesUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useFetchCategoriesUsecase = (): FetchCategoriesUsecase =>
  new RemoteFetchCategoriesUsecase(
    useApiUrl(constants.urls.categoriesFetch),
    useAuthorizeHttpClient()
  )
