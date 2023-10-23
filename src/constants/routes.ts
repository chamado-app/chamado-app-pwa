export const routes = {
  auth: {
    authenticate: 'auth.authenticate'
  },
  categories: {
    list: 'categories.list',
    show: 'categories.show',
    create: 'categories.create'
  },
  home: 'home',
  tickets: {
    list: 'tickets.list',
    show: 'tickets.show'
  }
} as const
