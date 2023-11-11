import { constants } from '@/constants'
import { RemoteShowUserUsecase } from '@/data/usecases'
import { type ShowUserUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useShowUserUsecase = (): ShowUserUsecase =>
  new RemoteShowUserUsecase(
    useApiUrl(constants.urls.users),
    useAuthorizeHttpClient()
  )
