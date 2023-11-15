import { defineStore } from 'pinia'

import { type Role, type UserEntity } from '@/domain/entities'

type UserForm = Partial<Omit<UserEntity, 'roles'>> & {
  role?: Role
}

export type ShowUserState = {
  form: UserForm
  isSubmitting: boolean
}

export const useShowUserStore = defineStore('showUser', {
  state: (): ShowUserState => ({
    form: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isActive: true
    },
    isSubmitting: false
  })
})
