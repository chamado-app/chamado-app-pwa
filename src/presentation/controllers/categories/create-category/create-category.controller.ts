import { onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import { useShowCategoryStore } from '@/presentation/store'

import { type CreateCategoryController } from './types'

export const useCreateCategoryController = (): CreateCategoryController => {
  const router = useRouter()
  const store = useShowCategoryStore()

  const onCancel = (): void => {
    router.back()
  }

  const onSubmit = async (): Promise<void> => {
    console.log(store.form)
  }

  onUnmounted(() => {
    store.$reset()
  })

  return { store, onCancel, onSubmit }
}
