import { constants } from '@/data/constants'
import { RemoteListTickets } from '@/data/usecases'
import type { ListTickets } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/presentation/factories'

export const useListTickets = (): ListTickets =>
  new RemoteListTickets(
    useApiUrl(constants.urls.listTickets),
    useAuthorizeHttpClient()
  )
