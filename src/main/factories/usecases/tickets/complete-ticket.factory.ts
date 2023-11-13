import { constants } from '@/constants'
import { RemoteCompleteTicketUsecase } from '@/data/usecases'
import { type CompleteTicketUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useCompleteTicketUsecase = (): CompleteTicketUsecase =>
  new RemoteCompleteTicketUsecase(
    useApiUrl(constants.urls.ticketsComplete),
    useAuthorizeHttpClient()
  )
