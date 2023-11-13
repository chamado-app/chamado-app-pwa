import { constants } from '@/constants'
import { RemoteSendTicketTextMessageUsecase } from '@/data/usecases'
import { type SendTicketTextMessageUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useSendTicketTextMessageUsecase =
  (): SendTicketTextMessageUsecase =>
    new RemoteSendTicketTextMessageUsecase(
      useApiUrl(constants.urls.ticketsSendTextMessage),
      useAuthorizeHttpClient()
    )
