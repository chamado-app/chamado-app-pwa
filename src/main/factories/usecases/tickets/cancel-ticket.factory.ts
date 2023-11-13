import { constants } from '@/constants'
import { RemoteCancelTicketUsecase } from '@/data/usecases'
import { type CancelTicketUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useCancelTicketUsecase = (): CancelTicketUsecase =>
  new RemoteCancelTicketUsecase(
    useApiUrl(constants.urls.ticketsCancel),
    useAuthorizeHttpClient()
  )
