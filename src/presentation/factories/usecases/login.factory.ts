import { constants } from '@/data/constants'
import { RemoteLogin } from '@/data/usecases'
import type { Login } from '@/domain/usecases'
import { useApiUrl, useHttpClient } from '@/presentation/factories'

export const useLogin = (): Login =>
  new RemoteLogin(useApiUrl(constants.urls.login), useHttpClient())
