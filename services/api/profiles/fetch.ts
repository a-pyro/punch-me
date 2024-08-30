import { useMutation, useQuery } from '@tanstack/react-query'

import { useSession } from '@/context'
import { queryClient } from '@/services/react-query'
import { expoSecureStore } from '@/services/secure-store'
import { supabaseClient } from '@/supabase'
import { COLLECTIONS, type Profile, type ProfileUpdate } from '@/supabase/types'

import { httpClient } from '../http-client'

type UserCreateResponse = Profile & {
  token: string
}

export const createProfile = async (
  user: Profile,
): Promise<UserCreateResponse> => {
  const { data } = await httpClient.create<UserCreateResponse, Profile>(
    '/users',
    user,
  )
  return data.data
}

export const updateProfile = async (user: ProfileUpdate) => {
  const { data } = await httpClient.update<Profile, ProfileUpdate>(
    `/users/${user.id}`,
    user,
  )
  return data.data
}

export const useCreateUser = () => {
  const createUserMutation = useMutation({
    mutationKey: ['user'],
    mutationFn: createProfile,
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
  const { session, signOut } = useSession()
  const mutationResult = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from(COLLECTIONS.profiles)
        .select('*')
        .eq('id', session?.user.id ?? '')
        .single()
      return data
    },
  })

  return {
    user: { ...(mutationResult.data as Profile), email: session?.user.email },
    signOut,
    ...mutationResult,
  }
}

export const useUpdateUser = () => {
  const updateUserMutation = useMutation({
    mutationKey: ['user'],
    mutationFn: updateProfile,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user)
    },
  })

  return {
    updateUser: updateUserMutation.mutateAsync,
    ...updateUserMutation,
  }
}
