import { constants } from '@/constants'
import { RemoteListUsersUsecase } from '@/data/usecases'
import { type ListUsersUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useListUsersUsecase = (): ListUsersUsecase =>
  new RemoteListUsersUsecase(
    useApiUrl(constants.urls.users),
    useAuthorizeHttpClient()
  )
