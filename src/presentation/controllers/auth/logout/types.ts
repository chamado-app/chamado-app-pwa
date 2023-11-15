export type LogoutControllerState = {
  loading: boolean
}

export interface LogoutController {
  state: LogoutControllerState
  logout: () => Promise<void>
}
