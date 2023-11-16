/* eslint-disable */
import { mdiCached } from '@quasar/extras/mdi-v7'
import { Notify } from 'quasar'
import { register } from 'register-service-worker'

register(process.env.SERVICE_WORKER_FILE, {
  updated() {
    Notify.create({
      color: 'negative',
      icon: mdiCached,
      message: 'Nova versão disponível, clique para atualizar',
      timeout: 0,
      multiLine: true,
      position: 'top',
      actions: [
        {
          label: 'Atualizar',
          color: 'white',
          handler: () => {
            window.location.reload()
          }
        }
      ]
    })
  }
})
