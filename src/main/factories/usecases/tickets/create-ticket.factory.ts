import { constants } from '@/constants'
import { RemoteCreateTicketUsecase } from '@/data/usecases'
import { type CreateTicketUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useCreateTicketUsecase = (): CreateTicketUsecase =>
  new RemoteCreateTicketUsecase(
    useApiUrl(constants.urls.tickets),
    useAuthorizeHttpClient()
  )
