import { constants } from '@/constants'
import { RemoteCreateEquipmentUsecase } from '@/data/usecases'
import { type CreateEquipmentUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useCreateEquipmentUsecase = (): CreateEquipmentUsecase =>
  new RemoteCreateEquipmentUsecase(
    useApiUrl(constants.urls.equipments),
    useAuthorizeHttpClient()
  )
