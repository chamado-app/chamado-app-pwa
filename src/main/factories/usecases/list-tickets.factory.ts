import { RemoteListTickets } from '@/data/usecases'
import type { ListTickets } from '@/domain/usecases'
import { constants } from '@/infra/constants'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useListTicketsUsecase = (): ListTickets =>
  new RemoteListTickets(
    useApiUrl(constants.urls.listTickets),
    useAuthorizeHttpClient()
  )
