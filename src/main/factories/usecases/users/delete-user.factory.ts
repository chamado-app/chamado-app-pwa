import { constants } from '@/constants'
import { RemoteDeleteUserUsecase } from '@/data/usecases'
import { type DeleteUserUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useDeleteUserUsecase = (): DeleteUserUsecase =>
  new RemoteDeleteUserUsecase(
    useApiUrl(constants.urls.users),
    useAuthorizeHttpClient()
  )
