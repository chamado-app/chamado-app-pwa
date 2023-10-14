import { inject } from 'vue'

import { type WhoAmI } from '@/domain/usecases'
import { useWhoAmIState } from '@/presentation/store'

import { type WhoAmIController } from './types'

export const useWhoAmIController = (): WhoAmIController => {
  const state = useWhoAmIState()
  const whoAmIUsecase = inject<WhoAmI>('whoAmIUsecase')!

  const load = async (): Promise<void> => {
    if (state.loading) return
    state.$patch({ loading: true })

    try {
      const data = await whoAmIUsecase.execute()
      state.$patch({ data, loaded: true })
    } catch {
      state.$patch({ hasError: true })
    } finally {
      state.$patch({ loading: false })
    }
  }

  return { load }
}
