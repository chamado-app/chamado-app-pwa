import { type CategoryEntity, type Role } from '@/domain/entities'

export const USER_FORM_VALIDATION = {
  firstName: [(value: string) => !!value || 'Nome é obrigatório'],
  lastName: [(value: string) => !!value || 'Sobrenome é obrigatório'],
  email: [(value: string) => !!value || 'E-mail é obrigatório'],
  password: [
    (value: string) => !!value || 'Senha é obrigatória',
    (value: string) =>
      value.length >= 8 || 'Senha deve ter pelo menos 8 caracteres'
  ],
  role: [(value: Role | null) => !!value || 'Cargo é obrigatório'],
  sectors: [
    (value: CategoryEntity[] | null) =>
      !!value?.length || 'Áreas são obrigatórias'
  ]
}
