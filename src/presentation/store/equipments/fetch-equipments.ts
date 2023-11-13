import { defineStore } from 'pinia'

import { type EquipmentEntity } from '@/domain/entities'

export type FetchEquipmentsStore = {
  equipments: EquipmentEntity[]
  isLoading: boolean
  isLoaded: boolean
  hasError: boolean
}

export const useFetchEquipmentsStore = defineStore('fetchEquipments', {
  state: (): FetchEquipmentsStore => ({
    equipments: [],
    isLoading: false,
    isLoaded: false,
    hasError: false
  })
})
