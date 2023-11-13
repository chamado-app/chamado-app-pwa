export const urls = {
  authenticate: 'auth/login',
  categories: 'categories',
  categoriesFetch: 'categories/fetch',
  equipments: 'equipments',
  equipmentsFetch: 'equipments/fetch',
  tickets: 'tickets',
  ticketsCancel: 'tickets/:id/cancel',
  ticketsSendTextMessage: 'tickets/:id/messages/text',
  users: 'users',
  usersFetch: 'users/fetch',
  whoami: 'auth/whoami'
} as const
