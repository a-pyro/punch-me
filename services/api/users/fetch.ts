import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'

import { queryClient } from '@/services/react-query'
import { expoSecureStore } from '@/services/secure-store'
import { type User, type UserInsert, type UserUpdate } from '@/supabase/types'

import { httpClient } from '../http-client'

type UserCreateResponse = User & {
  token: string
}

export const createUser = async (
  user: UserInsert,
): Promise<UserCreateResponse> => {
  const { data } = await httpClient.create<UserCreateResponse, UserInsert>(
    '/users',
    user,
  )
  return data.data
}

export const updateUser = async ({ password: _, ...user }: UserUpdate) => {
  const { data } = await httpClient.update<User, UserUpdate>(
    `/users/${user.id}`,
    user,
  )
  return data.data
}

export const loginUser = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<UserCreateResponse> => {
  const { data } = await httpClient.create<
    UserCreateResponse,
    { email: string; password: string }
  >('/users/login', { email, password })

  return data.data
}

export const logoutUser = async () => {
  await expoSecureStore.deleteFromStore('accessToken')
  queryClient.setQueryData(['user'], null)
}

export const useCreateUser = () => {
  const createUserMutation = useMutation({
    mutationKey: ['user'],
    mutationFn: createUser,
    onSuccess: async ({ token, ...user }) => {
      await expoSecureStore.writeToStore('accessToken', token)
      queryClient.setQueryData(['user'], user)
    },
  })

  return {
    createUser: createUserMutation.mutateAsync,
    ...createUserMutation,
  }
}

export const useUser = () => {
  const mutationResult = useMutation({
    mutationKey: ['user'],
    mutationFn: loginUser,
    onSuccess: async ({ token, ...user }) => {
      await expoSecureStore.writeToStore('accessToken', token)
      queryClient.setQueryData(['user'], user)
    },
  })

  const logoutMutation = useMutation({
    mutationKey: ['user'],
    mutationFn: logoutUser,
    onSuccess: () => {
      router.push('/')
    },
  })

  const user = queryClient.getQueryData<User>(['user']) // i get it from the cache that i set when i logged in or signed up

  return {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- // TODO fix this (see RootPage) this is done to have a typed user everywhere esle in the app, surely can be hadled more gracefully
    user: user!,
    signInUser: mutationResult.mutateAsync,
    logoutUser: logoutMutation.mutateAsync,
    ...mutationResult,
  }
}

export const useUpdateUser = () => {
  const updateUserMutation = useMutation({
    mutationKey: ['user'],
    mutationFn: updateUser,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user)
    },
  })

  return {
    updateUser: updateUserMutation.mutateAsync,
    ...updateUserMutation,
  }
}
