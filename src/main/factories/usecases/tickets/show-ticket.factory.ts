import { constants } from '@/constants'
import { RemoteShowTicketUsecase } from '@/data/usecases'
import { type ShowTicketUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useShowTicketUsecase = (): ShowTicketUsecase =>
  new RemoteShowTicketUsecase(
    useApiUrl(constants.urls.tickets),
    useAuthorizeHttpClient()
  )
