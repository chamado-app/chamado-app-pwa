import type { QCol, QRow } from '@/components'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    QRow: typeof QRow
    QCol: typeof QCol
  }
}
