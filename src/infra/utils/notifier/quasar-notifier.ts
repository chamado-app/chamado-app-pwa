import { Notify, type QNotifyCreateOptions } from 'quasar'

import type { Notifier, NotifierProps } from '@/data/protocols'

export class QuasarNotifier implements Notifier {
  notify(props: NotifierProps): void {
    const types: Record<NotifierProps['type'], QNotifyCreateOptions['type']> = {
      success: 'positive',
      error: 'negative',
      info: 'info',
      warning: 'warning'
    }

    const icons: Record<NotifierProps['type'], QNotifyCreateOptions['icon']> = {
      success: 'mdi-check',
      error: 'mdi-close',
      info: 'mdi-information-outline',
      warning: 'mdi-alert-outline'
    }

    Notify.create({
      type: types[props.type],
      icon: icons[props.type],
      message: props.message,
      position: 'bottom-left',
      textColor: 'white',
      progress: true
    })
  }

  success(props: Omit<NotifierProps, 'type'>): void {
    this.notify({ ...props, type: 'success' })
  }

  error(props: Omit<NotifierProps, 'type'>): void {
    this.notify({ ...props, type: 'error' })
  }

  warning(props: Omit<NotifierProps, 'type'>): void {
    this.notify({ ...props, type: 'warning' })
  }

  info(props: Omit<NotifierProps, 'type'>): void {
    this.notify({ ...props, type: 'info' })
  }
}
