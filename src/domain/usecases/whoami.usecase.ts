import { type WhoAmIEntity } from '@/domain/entities'

export interface WhoAmI {
  execute: () => Promise<WhoAmI.Output>
}

export namespace WhoAmI {
  export type Input = never
  export type Output = WhoAmIEntity
}
