export type ListInputDto = {
  take: number
  skip: number
  search?: string
}

export type ListOutputDto = {
  total: number
  take: number
  skip: number
}
