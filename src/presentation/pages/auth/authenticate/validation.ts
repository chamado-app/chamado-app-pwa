import { isEmail } from '@/presentation/utils/validations'

export const LOGIN_VALIDATION = {
  email: [
    (value: string) => !!value || 'O e-mail obrigatório',
    (value: string) => isEmail(value) || 'Digite um e-mail válido'
  ],
  password: [(value: string) => !!value || 'A senha obrigatória']
}
