import { type CategoryEntity } from '@/domain/entities'

import { type RemoteCategoryEntity } from './types'

export const parseRemoteCategoryEntityToCategoryEntity = ({
  createdAt,
  updatedAt,
  ...category
}: RemoteCategoryEntity): CategoryEntity => ({
  ...category,
  createdAt: new Date(createdAt),
  updatedAt: new Date(updatedAt)
})
