import { defineStore } from 'pinia'

import { type CategoryEntity } from '@/domain/entities'

export type ShowCategoryState = {
  form: Partial<CategoryEntity>
  isSubmitting: boolean
}

export const useShowCategoryStore = defineStore('showCategory', {
  state: (): ShowCategoryState => ({
    form: { name: '', description: '', isActive: true },
    isSubmitting: false
  })
})
