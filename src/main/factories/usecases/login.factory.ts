import { RemoteLogin } from '@/data/usecases'
import type { Login } from '@/domain/usecases'
import { constants } from '@/infra/constants'
import { useApiUrl, useHttpClient, useStoreAuthToken } from '@/main/factories'

export const useLoginUsecase = (): Login =>
  new RemoteLogin(
    useApiUrl(constants.urls.login),
    useHttpClient(),
    useStoreAuthToken()
  )