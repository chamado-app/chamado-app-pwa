type TypedNotifier = {
  [x in Notifier.Types]: (props: Omit<Notifier.Props, 'type'>) => void
}

export interface Notifier extends TypedNotifier {
  notify: (props: Notifier.Props) => void
}

export namespace Notifier {
  export type Types = 'success' | 'error' | 'info' | 'warning'

  export type Props = {
    message: string
    type: Types
  }
}
