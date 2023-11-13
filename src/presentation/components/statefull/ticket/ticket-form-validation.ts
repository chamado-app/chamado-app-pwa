export const TICKET_FORM_VALIDATION = {
  title: [
    (value: string) => !!value || 'O título é obrigatório',
    (value: string) =>
      value.length >= 3 || 'O título deve ter pelo menos 3 caracteres',
    (value: string) =>
      value.length <= 120 || 'O título deve ter pelo no máximo 120 caracteres'
  ],
  message: [
    (value: string) => !!value || 'A mensagem é obrigatório',
    (value: string) =>
      value.length >= 10 || 'A mensagem deve ter pelo menos 10 caracteres',
    (value: string) =>
      value.length <= 1024 ||
      'A mensagem deve ter pelo no máximo 1024 caracteres'
  ],
  categoryId: [
    (value: string) => !!value || 'É necessário selecionar uma área'
  ],
  equipmentId: [
    (value: string) => !!value || 'É necessário selecionar um equipamento'
  ]
}
