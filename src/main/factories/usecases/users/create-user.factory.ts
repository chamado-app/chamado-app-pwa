import { constants } from '@/constants'
import { RemoteCreateUserUsecase } from '@/data/usecases'
import { type CreateUserUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useCreateUserUsecase = (): CreateUserUsecase =>
  new RemoteCreateUserUsecase(
    useApiUrl(constants.urls.users),
    useAuthorizeHttpClient()
  )
