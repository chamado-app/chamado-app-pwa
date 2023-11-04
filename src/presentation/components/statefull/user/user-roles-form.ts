import { Role } from '@/domain/entities'

type UserRoleForm = {
  label: string
  value: Role
}

export const USER_ROLES_FORM: UserRoleForm[] = [
  { label: 'Cliente', value: Role.USER },
  { label: 'Gerente', value: Role.MANAGER },
  { label: 'Técnico', value: Role.TECHNICIAN }
]
