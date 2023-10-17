import { constants } from '@/constants'
import { RemoteAuthenticate } from '@/data/usecases'
import type { AuthenticateUsecase } from '@/domain/usecases'
import { useApiUrl, useHttpClient, useStoreAuthToken } from '@/main/factories'

export const useAuthenticateUsecase = (): AuthenticateUsecase =>
  new RemoteAuthenticate(
    useApiUrl(constants.urls.authenticate),
    useHttpClient(),
    useStoreAuthToken()
  )
