export const routes = {
  auth: {
    authenticate: 'auth.authenticate'
  },
  categories: {
    list: 'categories.list',
    show: 'categories.show',
    create: 'categories.create'
  },
  equipments: {
    create: 'equipments.create',
    list: 'equipments.list',
    show: 'equipments.show'
  },
  home: 'home',
  tickets: {
    create: 'tickets.create',
    list: 'tickets.list',
    show: 'tickets.show'
  },
  users: {
    create: 'users.create',
    list: 'users.list',
    show: 'users.show'
  }
} as const
