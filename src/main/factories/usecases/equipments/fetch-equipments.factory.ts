import { constants } from '@/constants'
import { RemoteFetchEquipmentsUsecase } from '@/data/usecases'
import { type FetchEquipmentsUsecase } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useFetchEquipmentsUsecase = (): FetchEquipmentsUsecase =>
  new RemoteFetchEquipmentsUsecase(
    useApiUrl(constants.urls.equipmentsFetch),
    useAuthorizeHttpClient()
  )
