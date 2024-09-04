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

export const getStore = async (storeId: string) => {
  return await httpClient.getOne('stores', storeId)
}

export const getStores = async (userId: string) => {
  return await httpClient.getList('stores', { user_id: userId })
}

export const useCreateStore = () => {
  const createStoreMutation = useMutation({
    mutationKey: [ENTITIES.stores],
    mutationFn: createStore,
    onSuccess: async () => {
      await invalidateQueries([ENTITIES.stores])
    },
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
    onSuccess: async () =>
      queryClient.invalidateQueries({
        queryKey: [ENTITIES.stores],
      }),
  })

  return {
    updateStore: updateStoreMutation.mutateAsync,
    ...updateStoreMutation,
  }
}

export const useGetStore = ({
  storeId,
  enabled = true,
}: {
  storeId: string
  enabled?: boolean
}) => {
  const queryResult = useQuery({
    queryKey: [ENTITIES.stores, { storeId }],
    queryFn: () => getStore(storeId),
    enabled,
  })

  const getAsync = useMutation({
    mutationFn: async (storeId: string) => getStore(storeId),
  })

  return {
    store: queryResult.data,
    ...queryResult,
    getStoreAsync: getAsync.mutateAsync,
    isGettingAsync: getAsync.isPending,
  }
}

export const useGetUserStores = () => {
  const { profile: user } = useSession()
  const queryResult = useQuery({
    queryKey: [ENTITIES.stores, { userId: user.id }],
    queryFn: () => getStores(user.id),
  })

  return {
    stores: queryResult.data ?? [],
    ...queryResult,
  }
}
