import { defineStore } from 'pinia'

import { EquipmentStatus, type EquipmentEntity } from '@/domain/entities'

export type ShowEquipmentState = {
  form: Partial<EquipmentEntity>
  isSubmitting: boolean
}

export const useShowEquipmentStore = defineStore('showEquipment', {
  state: (): ShowEquipmentState => ({
    form: {
      id: '',
      additionalInfo: '',
      brand: '',
      model: '',
      name: '',
      patrimony: '',
      section: '',
      serial: '',
      status: EquipmentStatus.WORKING,
      type: ''
    },
    isSubmitting: false
  })
})
