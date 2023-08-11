/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Factory, Model, Serializer, createServer } from 'miragejs'
import { uid } from 'quasar'

import { mockTicketEntity } from '@/__mocks__/domain/entities'

const makeFactory = (factory) => {
  const keys = Object.keys(factory())
  const final = {}

  keys.forEach((key) => {
    if (key === 'id') return

    final[key] = function () {
      return factory()[key]
    }
  })

  return final
}

class IdentityManager {
  constructor() {
    this.ids = new Set()
  }

  fetch() {
    let uuid = uid()
    while (this.ids.has(uuid)) uuid = uid()
    this.ids.add(uuid)
    return uuid
  }

  set(id) {
    if (this.ids.has(id)) throw new Error(`ID ${id} has already been used.`)

    this.ids.add(id)
  }

  reset() {
    this.ids.clear()
  }
}

export const mockServer = ({ environment = 'development' } = {}) => {
  const server = createServer({
    environment,

    models: {
      ticket: Model
    },

    factories: {
      ticket: Factory.extend(makeFactory(mockTicketEntity))
    },

    seeds(server) {
      server.createList('ticket', 10)
    },

    routes() {
      this.passthrough()
      this.passthrough('http://localhost:3000/**')
      this.namespace = ''
      this.urlPrefix = 'http://localhost:3000'

      this.get('/tickets', (schema) => schema.tickets.all())
    },
    identityManagers: { application: IdentityManager },
    serializers: {
      application: Serializer.extend({ keyForModel: () => 'data' })
    }
  })

  return server
}
