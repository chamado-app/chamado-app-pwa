import { constants } from '@/constants'
import { RemoteFetchUsersUsecase } from '@/data/usecases'
import { type FetchUsersUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useFetchUsersUsecase = (): FetchUsersUsecase =>
  new RemoteFetchUsersUsecase(
    useApiUrl(constants.urls.usersFetch),
    useAuthorizeHttpClient()
  )
