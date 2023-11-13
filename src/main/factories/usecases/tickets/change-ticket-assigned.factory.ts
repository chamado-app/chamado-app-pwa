import { constants } from '@/constants'
import { RemoteChangeTicketAssignedUsecase } from '@/data/usecases'
import { type ChangeTicketAssignedUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useChangeTicketAssignedUsecase = (): ChangeTicketAssignedUsecase =>
  new RemoteChangeTicketAssignedUsecase(
    useApiUrl(constants.urls.ticketsAssing),
    useAuthorizeHttpClient()
  )
