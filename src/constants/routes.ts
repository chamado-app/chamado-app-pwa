export const routes = {
  auth: {
    authenticate: 'auth.authenticate'
  },
  tickets: {
    list: 'tickets.list',
    show: 'tickets.show'
  },
  categories: {
    list: 'categories.list'
  }
} as const
