import { useMutation, useQuery } from '@tanstack/react-query'

import { invalidateQueries } from '@/services/react-query/query-client'
import {
  COLLECTIONS,
  type Punchcard,
  type PunchcardInsert,
  type PunchcardUpdate,
  httpClient,
} from '@/supabase'

export const useGetPunchcards = (storeId: string) => {
  const queryResult = useQuery<Punchcard[]>({
    queryKey: [COLLECTIONS.punchcards, storeId],
    queryFn: () =>
      httpClient.getList(COLLECTIONS.punchcards, { store_id: storeId }),
  })

  return {
    punchcards: queryResult.data ?? [],
    ...queryResult,
  }
}

export const useGetPunchcard = (id: string) => {
  const queryResult = useQuery<Punchcard>({
    queryKey: [COLLECTIONS.punchcards, id],
    queryFn: () => httpClient.getOne(COLLECTIONS.punchcards, id),
  })

  const getAsync = useMutation({
    mutationFn: async (id: string) =>
      httpClient.getOne(COLLECTIONS.punchcards, id),
  })

  return {
    punchcard: queryResult.data,
    ...queryResult,
    getAsyncPunchcard: getAsync.mutateAsync,
    isGettingAsync: getAsync.isPending,
  }
}

export const usePunchcardsMutation = () => {
  const createMutation = useMutation({
    mutationFn: async (punchcard: PunchcardInsert) =>
      await httpClient.create(COLLECTIONS.punchcards, punchcard),
    mutationKey: [COLLECTIONS.punchcards],
    onSuccess: async () => invalidateQueries([COLLECTIONS.punchcards]),
  })

  const updateMutation = useMutation({
    mutationFn: async (punchcard: PunchcardUpdate) =>
      await httpClient.update(COLLECTIONS.punchcards, punchcard),
    mutationKey: [COLLECTIONS.punchcards],
    onSuccess: async () => invalidateQueries([COLLECTIONS.punchcards]),
  })

  return {
    createMutation,
    updateMutation,
  }
}
