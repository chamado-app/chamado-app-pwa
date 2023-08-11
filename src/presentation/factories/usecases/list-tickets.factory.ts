import { constants } from '@/data/constants'
import { RemoteListTickets } from '@/data/usecases'
import type { ListTickets } from '@/domain/usecases'
import { useApiUrl, useHttpClient } from '@/presentation/factories'

export const useListTickets = (): ListTickets =>
  new RemoteListTickets(useApiUrl(constants.urls.listTickets), useHttpClient())
