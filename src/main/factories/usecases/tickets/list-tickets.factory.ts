import { constants } from '@/constants'
import { RemoteListTicketsUsecase } from '@/data/usecases'
import type { ListTicketsUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useListTicketsUsecase = (): ListTicketsUsecase =>
  new RemoteListTicketsUsecase(
    useApiUrl(constants.urls.tickets),
    useAuthorizeHttpClient()
  )
