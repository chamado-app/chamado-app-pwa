import { type WhoAmIEntity } from '@/domain/entities'

export interface WhoAmIUsecase {
  execute: () => Promise<WhoAmIUsecase.Output>
}

export namespace WhoAmIUsecase {
  export type Input = never
  export type Output = WhoAmIEntity
}
