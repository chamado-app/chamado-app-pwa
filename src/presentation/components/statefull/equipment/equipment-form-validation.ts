export const EQUIPMENT_FORM_VALIDATION = {
  name: [
    (value: string) => !!value || 'O nome é obrigatório',
    (value: string) =>
      value.length >= 3 || 'O nome deve ter pelo menos 3 caracteres',
    (value: string) =>
      value.length <= 80 || 'O nome deve ter pelo no máximo 80 caracteres'
  ],
  brand: [
    (value: string) => !!value || 'A marca é obrigatório',
    (value: string) =>
      value.length >= 2 || 'A marca deve ter pelo menos 2 caracteres',
    (value: string) =>
      value.length <= 80 || 'A marca deve ter pelo no máximo 80 caracteres'
  ],
  model: [
    (value: string) => !!value || 'O modelo é obrigatório',
    (value: string) =>
      value.length >= 3 || 'O modelo deve ter pelo menos 3 caracteres',
    (value: string) =>
      value.length <= 80 || 'O modelo deve ter pelo no máximo 80 caracteres'
  ],
  type: [
    (value: string) => !!value || 'O tipo é obrigatório',
    (value: string) =>
      value.length >= 3 || 'O tipo deve ter pelo menos 3 caracteres',
    (value: string) =>
      value.length <= 60 || 'O tipo deve ter pelo no máximo 60 caracteres'
  ],
  section: [
    (value: string) => !!value || 'A seção é obrigatório',
    (value: string) =>
      value.length >= 3 || 'A seção deve ter pelo menos 3 caracteres',
    (value: string) =>
      value.length <= 60 || 'A seção deve ter pelo no máximo 60 caracteres'
  ],
  patrimony: [
    (value: string) =>
      !value ||
      value.length >= 3 ||
      'O patrimônio deve ter pelo menos 3 caracteres',
    (value: string) =>
      !value ||
      value.length <= 60 ||
      'O patrimônio deve ter pelo no máximo 60 caracteres'
  ],
  serial: [
    (value: string) =>
      !!value ||
      value.length >= 3 ||
      'O número de série deve ter pelo menos 3 caracteres',
    (value: string) =>
      !!value ||
      value.length <= 60 ||
      'O número de série deve ter pelo no máximo 60 caracteres'
  ],
  additionalInfo: [
    (value: string) =>
      !value ||
      value.length >= 3 ||
      'As informações adicionais devem ter pelo menos 3 caracteres',
    (value: string) =>
      !value ||
      value.length <= 255 ||
      'As informações adicionais devem ter pelo no máximo 255 caracteres'
  ],
  status: [(value: string) => !!value || 'A situação é obrigatória']
}
