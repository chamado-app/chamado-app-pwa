import { constants } from '@/constants'
import { RemoteChangeTicketStatusUsecase } from '@/data/usecases'
import { type ChangeTicketStatusUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useChangeTicketStatusUsecase = (): ChangeTicketStatusUsecase =>
  new RemoteChangeTicketStatusUsecase(
    useApiUrl(constants.urls.tickets),
    useAuthorizeHttpClient()
  )
