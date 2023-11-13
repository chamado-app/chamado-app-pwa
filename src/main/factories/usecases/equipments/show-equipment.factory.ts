import { constants } from '@/constants'
import { RemoteShowEquipmentUsecase } from '@/data/usecases'
import { type ShowEquipmentUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useShowEquipmentUsecase = (): ShowEquipmentUsecase =>
  new RemoteShowEquipmentUsecase(
    useApiUrl(constants.urls.equipments),
    useAuthorizeHttpClient()
  )
