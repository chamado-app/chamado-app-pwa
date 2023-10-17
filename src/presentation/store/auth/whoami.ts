import { defineStore } from 'pinia'

import { Role, type WhoAmIEntity } from '@/domain/entities'

export type WhoAmIState = {
  data?: WhoAmIEntity
  loading: boolean
  loaded: boolean
  hasError: boolean
}

export const useWhoAmIStore = defineStore('whoami', {
  state: (): WhoAmIState => ({
    data: undefined,
    loading: false,
    loaded: false,
    hasError: false
  }),

  getters: {
    roles: (state): Role[] => state.data?.roles ?? [Role.GUEST]
  }
})
