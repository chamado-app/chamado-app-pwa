import { constants } from '@/data/constants'
import { RemoteLogin } from '@/data/usecases'
import type { Login } from '@/domain/usecases'
import { useApiUrl, useHttpClient, useStoreAuthToken } from '@/main/factories'

export const useLogin = (): Login =>
  new RemoteLogin(
    useApiUrl(constants.urls.login),
    useHttpClient(),
    useStoreAuthToken()
  )
