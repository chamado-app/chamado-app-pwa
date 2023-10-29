import { type CategoryEntity } from '@/domain/entities'

export type RemoteCategoryEntity = Omit<
  CategoryEntity,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string
  updatedAt: string
}
