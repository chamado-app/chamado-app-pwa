export const routes = {
  auth: {
    authenticate: 'auth.authenticate'
  },
  categories: {
    list: 'categories.list',
    show: 'categories.show'
  },
  home: 'home',
  tickets: {
    list: 'tickets.list',
    show: 'tickets.show'
  }
} as const
