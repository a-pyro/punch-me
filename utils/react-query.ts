import { queryClient } from '@/services/react-query'

export const invalidateQueries = (queryKey: string[]) =>
  queryClient.invalidateQueries({ queryKey: [queryKey] })
