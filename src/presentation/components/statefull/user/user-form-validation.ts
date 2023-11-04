import { type Role } from '@/domain/entities'

export const USER_FORM_VALIDATION = {
  firstName: [(value: string) => !!value || 'Nome é obrigatório'],
  lastName: [(value: string) => !!value || 'Sobrenome é obrigatório'],
  email: [(value: string) => !!value || 'E-mail é obrigatório'],
  password: [(value: string) => !!value || 'Senha é obrigatória'],
  roles: [(value: Role[] | null) => !!value?.length || 'Cargo é obrigatório']
}
