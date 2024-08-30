import { useMutation, useQuery } from '@tanstack/react-query'

import { queryClient } from '@/services/react-query'
import { type StoreInsert, type StoreUpdate, httpClient } from '@/supabase'

import { useProfile } from '../profiles'

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
    mutationKey: ['store'],
    mutationFn: createStore,
  })

  return {
    createStore: createStoreMutation.mutateAsync,
    ...createStoreMutation,
  }
}

export const useUpdateStore = () => {
  const updateStoreMutation = useMutation({
    mutationKey: ['store'],
    mutationFn: updateStore,
    onSuccess: async ({ id }) => {
      await queryClient.invalidateQueries({ queryKey: ['store', id] })
    },
  })

  return {
    updateStore: updateStoreMutation.mutateAsync,
    ...updateStoreMutation,
  }
}

export const useGetStore = (id: string) => {
  const queryResult = useQuery({
    queryKey: ['store', id],
    queryFn: () => getStore(id),
  })

  return {
    store: queryResult.data,
    ...queryResult,
  }
}

export const useGetStores = () => {
  const { profile: user } = useProfile()
  const queryResult = useQuery({
    queryKey: ['stores', user.id],
    queryFn: () => getStores(user.id),
  })

  return {
    stores: queryResult.data ?? [],
    ...queryResult,
  }
}
