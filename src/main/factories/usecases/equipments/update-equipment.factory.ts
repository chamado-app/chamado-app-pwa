import { constants } from '@/constants'
import { RemoteUpdateEquipmentUsecase } from '@/data/usecases'
import { type UpdateEquipmentUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useUpdateEquipmentUsecase = (): UpdateEquipmentUsecase =>
  new RemoteUpdateEquipmentUsecase(
    useApiUrl(constants.urls.equipments),
    useAuthorizeHttpClient()
  )
