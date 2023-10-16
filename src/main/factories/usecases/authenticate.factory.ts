import { RemoteAuthenticate } from '@/data/usecases'
import type { AuthenticateUsecase } from '@/domain/usecases'
import { constants } from '@/infra/constants'
import { useApiUrl, useHttpClient, useStoreAuthToken } from '@/main/factories'

export const useAuthenticateUsecase = (): AuthenticateUsecase =>
  new RemoteAuthenticate(
    useApiUrl(constants.urls.authenticate),
    useHttpClient(),
    useStoreAuthToken()
  )
