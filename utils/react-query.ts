import { type QueryKey } from '@tanstack/react-query'

import { queryClient } from '@/services/react-query'

export const invalidateQueries = (queryKey: QueryKey) =>
  queryClient.invalidateQueries({ queryKey: [queryKey] })
