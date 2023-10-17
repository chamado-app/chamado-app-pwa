import { constants } from '@/constants'

export const useApiUrl = (uri: string): string =>
  `${constants.envronment.apiUrl}/${uri}`
