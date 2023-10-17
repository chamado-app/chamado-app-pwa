import { RemoteListTickets } from '@/data/usecases'
import type { ListTicketsUsecase } from '@/domain/usecases'
import { constants } from '@/infra/constants'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useListTicketsUsecase = (): ListTicketsUsecase =>
  new RemoteListTickets(
    useApiUrl(constants.urls.listTickets),
    useAuthorizeHttpClient()
  )
