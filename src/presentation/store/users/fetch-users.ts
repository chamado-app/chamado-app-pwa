import { defineStore } from 'pinia'

import { type UserEntity } from '@/domain/entities'

export type FetchUsersStore = {
  users: UserEntity[]
  isLoading: boolean
  isLoaded: boolean
  hasError: boolean
}

export const useFetchUsersStore = defineStore('fetchUsers', {
  state: (): FetchUsersStore => ({
    users: [],
    isLoading: false,
    isLoaded: false,
    hasError: false
  })
})
