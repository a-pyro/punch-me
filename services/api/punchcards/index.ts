import { useQuery } from '@tanstack/react-query'

import { COLLECTIONS, type Punchcard } from '@/supabase'

import { httpClient } from '../http-client'

export const getPunchards = async (storeId: string) => {
  const { data } = await httpClient.get<Punchcard[]>(
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
