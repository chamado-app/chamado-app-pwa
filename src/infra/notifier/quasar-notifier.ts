import { Notify, type QNotifyCreateOptions } from 'quasar'

import type { Notifier } from '@/data/protocols'

export class QuasarNotifier implements Notifier {
  notify(props: Notifier.Props): void {
    const types: Record<Notifier.Props['type'], QNotifyCreateOptions['type']> =
      {
        success: 'positive',
        error: 'negative',
        info: 'info',
        warning: 'warning'
      }

    const icons: Record<Notifier.Props['type'], QNotifyCreateOptions['icon']> =
      {
        success: 'mdi-check',
        error: 'mdi-close',
        info: 'mdi-information-outline',
        warning: 'mdi-alert-outline'
      }

    Notify.create({
      type: types[props.type],
      icon: icons[props.type],
      message: props.message,
      position: 'top-right',
      textColor: 'white',
      progress: true
    })
  }

  success(props: Omit<Notifier.Props, 'type'>): void {
    this.notify({ ...props, type: 'success' })
  }

  error(props: Omit<Notifier.Props, 'type'>): void {
    this.notify({ ...props, type: 'error' })
  }

  warning(props: Omit<Notifier.Props, 'type'>): void {
    this.notify({ ...props, type: 'warning' })
  }

  info(props: Omit<Notifier.Props, 'type'>): void {
    this.notify({ ...props, type: 'info' })
  }
}
