import { constants } from '@/constants'
import { RemoteUpdateUserUsecase } from '@/data/usecases'
import { type UpdateUserUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useUpdateUserUsecase = (): UpdateUserUsecase =>
  new RemoteUpdateUserUsecase(
    useApiUrl(constants.urls.users),
    useAuthorizeHttpClient()
  )
