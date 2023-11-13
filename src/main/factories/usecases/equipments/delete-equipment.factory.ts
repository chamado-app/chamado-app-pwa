import { constants } from '@/constants'
import { RemoteDeleteEquipmentUsecase } from '@/data/usecases'
import { type DeleteEquipmentUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useDeleteEquipmentUsecase = (): DeleteEquipmentUsecase =>
  new RemoteDeleteEquipmentUsecase(
    useApiUrl(constants.urls.equipments),
    useAuthorizeHttpClient()
  )
