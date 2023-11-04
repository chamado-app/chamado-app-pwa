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
  },
  users: {
    create: 'users.create',
    list: 'users.list',
    show: 'users.show'
  }
} as const
