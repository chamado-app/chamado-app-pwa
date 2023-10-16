export type NotifierTypes = 'success' | 'error' | 'info' | 'warning'

export type NotifierProps = {
  message: string
  type: NotifierTypes
}

type TypedNotifier = {
  [x in NotifierTypes]: (props: Omit<NotifierProps, 'type'>) => void
}

export interface Notifier extends TypedNotifier {
  notify: (props: NotifierProps) => void
}
