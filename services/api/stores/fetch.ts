import { useMutation, useQuery } from '@tanstack/react-query'

import { queryClient } from '@/services/react-query'
import { type Store, type StoreInsert, type StoreUpdate } from '@/supabase'

import { httpClient } from '../http-client'

const createStore = async (store: StoreInsert) => {
  const { data } = await httpClient.create<Store, StoreInsert>('/stores', store)
  return data.data
}

const updateStore = async (store: StoreUpdate) => {
  const { data } = await httpClient.update<Store, StoreUpdate>('/stores', store)
  return data.data
}

const getStore = async (id: string) => {
  const { data } = await httpClient.get<Store>(`/stores/${id}`)
  return data.data
}

export const useCreateStore = () => {
  const createStoreMutation = useMutation({
    mutationKey: ['store'],
    mutationFn: createStore,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['store'] })
    },
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['store'] })
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
