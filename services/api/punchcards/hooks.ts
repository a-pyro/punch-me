import { useMutation, useQuery } from '@tanstack/react-query'

import { invalidateQueries } from '@/services/react-query/query-client'
import {
  ENTITIES,
  type Punchcard,
  type PunchcardInsert,
  type PunchcardUpdate,
  httpClient,
} from '@/supabase'

export const useGetPunchcards = (storeId: string) => {
  const queryResult = useQuery<Punchcard[]>({
    queryKey: [ENTITIES.punchcards, storeId],
    queryFn: () =>
      httpClient.getList(ENTITIES.punchcards, { store_id: storeId }),
  })

  return {
    punchcards: queryResult.data ?? [],
    ...queryResult,
  }
}

export const useGetPunchcard = (id: string) => {
  const queryResult = useQuery<Punchcard>({
    queryKey: [ENTITIES.punchcards, id],
    queryFn: () => httpClient.getOne(ENTITIES.punchcards, id),
  })

  const getAsync = useMutation({
    mutationFn: async (id: string) =>
      httpClient.getOne(ENTITIES.punchcards, id),
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
      await httpClient.create(ENTITIES.punchcards, punchcard),
    mutationKey: [ENTITIES.punchcards],
    onSuccess: async () => invalidateQueries([ENTITIES.punchcards]),
  })

  const updateMutation = useMutation({
    mutationFn: async (punchcard: PunchcardUpdate) =>
      await httpClient.update(ENTITIES.punchcards, punchcard),
    mutationKey: [ENTITIES.punchcards],
    onSuccess: async () => invalidateQueries([ENTITIES.punchcards]),
  })

  return {
    createMutation,
    updateMutation,
  }
}
