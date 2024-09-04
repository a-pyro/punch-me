import { useMutation, useQuery } from '@tanstack/react-query'

import {
  ENTITIES,
  type Punchcard,
  type PunchcardInsert,
  type PunchcardUpdate,
  httpClient,
} from '@/supabase'
import { invalidateQueries } from '@/utils/react-query'

export const useGetPunchcards = (storeId: string) => {
  const queryResult = useQuery<Punchcard[]>({
    queryKey: [ENTITIES.punchcards, { storeId }],
    queryFn: () =>
      httpClient.getList(ENTITIES.punchcards, { store_id: storeId }),
  })

  return {
    punchcards: queryResult.data ?? [],
    ...queryResult,
  }
}

export const useGetPunchcard = (punchcardId: string) => {
  const queryResult = useQuery<Punchcard>({
    queryKey: [ENTITIES.punchcards, { punchcardId }],
    queryFn: () => httpClient.getOne(ENTITIES.punchcards, punchcardId),
  })

  const getAsync = useMutation({
    mutationFn: async (punchcardId: string) =>
      httpClient.getOne(ENTITIES.punchcards, punchcardId),
  })

  return {
    punchcard: queryResult.data,
    ...queryResult,
    getPunchcardAsync: getAsync.mutateAsync,
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
