export const routes = {
  auth: {
    authenticate: 'auth.authenticate'
  },
  categories: {
    list: 'categories.list'
  },
  home: 'home',
  tickets: {
    list: 'tickets.list',
    show: 'tickets.show'
  }
} as const
