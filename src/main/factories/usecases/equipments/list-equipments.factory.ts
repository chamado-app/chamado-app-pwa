import { constants } from '@/constants'
import { RemoteListEquipmentsUsecase } from '@/data/usecases'
import { type ListEquipmentsUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useListEquipmentsUsecase = (): ListEquipmentsUsecase =>
  new RemoteListEquipmentsUsecase(
    useApiUrl(constants.urls.equipments),
    useAuthorizeHttpClient()
  )
