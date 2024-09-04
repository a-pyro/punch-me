import { useMutation, useQuery } from '@tanstack/react-query'

import { useSession } from '@/context/session'
import { queryClient } from '@/services/react-query'
import {
  ENTITIES,
  type StoreInsert,
  type StoreUpdate,
  httpClient,
} from '@/supabase'
import { invalidateQueries } from '@/utils/react-query'

export const createStore = async (store: StoreInsert) => {
  return await httpClient.create('stores', store)
}

export const updateStore = async (store: StoreUpdate) => {
  return await httpClient.update('stores', store)
}

export const getStore = async (id: string) => {
  return await httpClient.getOne('stores', id)
}

export const getStores = async (userId?: string) => {
  return await httpClient.getList('stores', { user_id: userId })
}

export const useCreateStore = () => {
  const createStoreMutation = useMutation({
    mutationKey: [ENTITIES.stores],
    mutationFn: createStore,
    onSuccess: async () => invalidateQueries([ENTITIES.profiles]),
  })

  return {
    createStore: createStoreMutation.mutateAsync,
    ...createStoreMutation,
  }
}

export const useUpdateStore = () => {
  const updateStoreMutation = useMutation({
    mutationKey: [ENTITIES.stores],
    mutationFn: updateStore,
    onSuccess: async ({ id }) => {
      await queryClient.invalidateQueries({
        queryKey: [ENTITIES.stores, id],
      })
    },
  })

  return {
    updateStore: updateStoreMutation.mutateAsync,
    ...updateStoreMutation,
  }
}

export const useGetStore = (id: string) => {
  const queryResult = useQuery({
    queryKey: [ENTITIES.stores, id],
    queryFn: () => getStore(id),
  })

  return {
    store: queryResult.data,
    ...queryResult,
  }
}

export const useGetStores = () => {
  const { profile: user } = useSession()
  const queryResult = useQuery({
    queryKey: ['stores', user.id],
    queryFn: () => getStores(user.id),
  })

  return {
    stores: queryResult.data ?? [],
    ...queryResult,
  }
}
