export interface WhoAmIController {
  load: WhoAmIController.Load
}

export namespace WhoAmIController {
  export type Load = () => Promise<void>
}
