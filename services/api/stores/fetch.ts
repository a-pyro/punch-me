import { useMutation } from '@tanstack/react-query'

import { type Store, type StoreInsert, type StoreUpdate } from '@/supabase'

import { httpClient } from '../http-client'

const createStore = async (store: StoreInsert) => {
  const { data } = await httpClient.create<Store, StoreInsert>('/stores', store)
  return data
}

const updateStore = async (store: StoreUpdate) => {
  const { data } = await httpClient.update<Store, StoreUpdate>('/stores', store)
  return data
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
  })

  return {
    updateStore: updateStoreMutation.mutateAsync,
    ...updateStoreMutation,
  }
}
