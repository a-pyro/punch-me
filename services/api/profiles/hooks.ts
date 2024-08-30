import { useMutation, useQuery } from '@tanstack/react-query'

import { useSession } from '@/context'
import { httpClient } from '@/supabase'
import { type Profile, type ProfileUpdate } from '@/supabase/types'

export const createProfile = async (profile: Profile) => {
  return await httpClient.create('profiles', profile)
}

export const updateProfile = async ({
  email: _,
  ...user
}: ProfileUpdate & {
  email: string
}) => {
  return await httpClient.update('profiles', user)
}

export const useCreateProfile = () => {
  const createUserMutation = useMutation({
    mutationKey: ['profile'],
    mutationFn: createProfile,
  })

  return {
    createUser: createUserMutation.mutateAsync,
    ...createUserMutation,
  }
}

export const useProfile = () => {
  const { session, signOut } = useSession()
  const mutationResult = useQuery({
    queryKey: ['profile'],
    queryFn: async () => httpClient.getOne('profiles', session?.user.id ?? ''),
  })

  return {
    profile: {
      ...mutationResult.data,
      email: session?.user.email,
    } as Profile & { email: string },
    signOut,
    ...mutationResult,
  }
}

export const useUpdateProfile = () => {
  const updateUserMutation = useMutation({
    mutationKey: ['profile'],
    mutationFn: updateProfile,
  })

  return {
    updateProfile: updateUserMutation.mutateAsync,
    ...updateUserMutation,
  }
}
