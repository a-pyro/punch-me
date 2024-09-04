import { queryClient } from '@/services/react-query'
import { QueryKey } from '@tanstack/react-query'

export const invalidateQueries = (queryKey: QueryKey) =>
  queryClient.invalidateQueries({ queryKey: [queryKey] })
