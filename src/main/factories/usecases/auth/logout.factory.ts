import { constants } from '@/constants'
import { RemoteLogoutUsecase } from '@/data/usecases'
import type { LogoutUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

import { useRemoveAuthToken } from './remove-auth-token.usecase'

export const useLogoutUsecase = (): LogoutUsecase =>
  new RemoteLogoutUsecase(
    useApiUrl(constants.urls.logout),
    useAuthorizeHttpClient(),
    useRemoveAuthToken()
  )
