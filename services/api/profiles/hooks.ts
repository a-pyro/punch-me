import { useMutation, useQuery } from '@tanstack/react-query'

import { useSession } from '@/context'
import { httpClient } from '@/supabase'
import { type Profile, type ProfileUpdate } from '@/supabase/types'

export const useCreateProfile = () => {
  const createUserMutation = useMutation({
    mutationKey: ['profile'],
    mutationFn: (profile: Profile) => httpClient.create('profiles', profile),
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
    queryFn: () => httpClient.getOne('profiles', session?.user.id ?? ''),
    select: (data) => ({ ...data, email: session?.user.email }),
  })

  return {
    signOut,
    profile: mutationResult.data as Profile,
    ...mutationResult,
  }
}

export const useUpdateProfile = () => {
  const updateUserMutation = useMutation({
    mutationKey: ['profile'],
    // need to remove the email from the user object before updating because is not part of the profile table but we're mapping it in the select function above
    mutationFn: async ({
      email: _,
      ...user
    }: ProfileUpdate & {
      email: string
    }) => await httpClient.update('profiles', user),
  })

  return {
    updateProfile: updateUserMutation.mutateAsync,
    ...updateUserMutation,
  }
}
