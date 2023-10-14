import { useWhoAmI } from '@/presentation/factories'
import { useWhoAmIState } from '@/presentation/stores'

import { type WhoAmIController } from './types'

export const useWhoAmIController = (): WhoAmIController => {
  const state = useWhoAmIState()
  const loader = useWhoAmI()

  const load = async (): Promise<void> => {
    if (state.loading) return
    state.$patch({ loading: true })

    try {
      const data = await loader.execute()
      state.$patch({ data, loaded: true })
    } catch {
      state.$patch({ hasError: true })
    } finally {
      state.$patch({ loading: false })
    }
  }

  return { load }
}
