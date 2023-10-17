import { constants } from '@/constants'
import { RemoteListTickets } from '@/data/usecases'
import type { ListTicketsUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useListTicketsUsecase = (): ListTicketsUsecase =>
  new RemoteListTickets(
    useApiUrl(constants.urls.listTickets),
    useAuthorizeHttpClient()
  )
