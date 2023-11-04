import { defineStore } from 'pinia'

import { type UserEntity } from '@/domain/entities'

export type ShowUserState = {
  form: Partial<UserEntity>
  isSubmitting: boolean
}

export const useShowUserStore = defineStore('showUser', {
  state: (): ShowUserState => ({
    form: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roles: [],
      isActive: true
    },
    isSubmitting: false
  })
})
