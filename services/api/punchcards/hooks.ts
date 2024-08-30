import { useMutation, useQuery } from '@tanstack/react-query'

import { queryClient } from '@/services/react-query/query-client'
import {
  COLLECTIONS,
  type Punchcard,
  type PunchcardInsert,
  type PunchcardUpdate,
} from '@/supabase'

import { httpAxiosClient } from '../axios-client'

export const getPunchards = async (storeId: string) => {
  const { data } = await httpAxiosClient.get<Punchcard[]>(
    `/${COLLECTIONS.punchcards}`,
    {
      params: {
        store_id: storeId,
      },
    },
  )

  return data.data
}

export const useGetPunchcards = (storeId: string) => {
  const queryResult = useQuery<Punchcard[]>({
    queryKey: [COLLECTIONS.punchcards, storeId],
    queryFn: () => getPunchards(storeId),
  })

  return {
    punchcards: queryResult.data ?? [],
    ...queryResult,
  }
}

export const createPunchcard = async (data: PunchcardInsert) => {
  const { data: response } = await httpAxiosClient.create<
    Punchcard,
    PunchcardInsert
  >(`/${COLLECTIONS.punchcards}`, data)

  return response.data
}

export const updatePunchcard = async (data: PunchcardUpdate) => {
  const { data: response } = await httpAxiosClient.update<
    Punchcard,
    PunchcardUpdate
  >(`/${COLLECTIONS.punchcards}/${data.id}`, data)
  return response.data
}

export const usePunchcardsMutation = () => {
  const createMutation = useMutation({
    mutationFn: createPunchcard,
    mutationKey: [COLLECTIONS.punchcards],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [COLLECTIONS.punchcards],
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updatePunchcard,
    mutationKey: [COLLECTIONS.punchcards],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [COLLECTIONS.punchcards],
      })
    },
  })

  return {
    createMutation,
    updateMutation,
  }
}
