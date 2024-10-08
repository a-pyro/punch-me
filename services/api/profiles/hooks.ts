import { useMutation } from '@tanstack/react-query'

import { httpClient } from '@/supabase'
import { ENTITIES, type Profile, type ProfileUpdate } from '@/supabase/types'
import { invalidateQueries } from '@/utils/react-query'

export const useCreateProfile = () => {
  const createUserMutation = useMutation({
    mutationKey: [ENTITIES.profiles],
    mutationFn: (profile: Profile) => httpClient.create('profiles', profile),
  })

  return {
    createUser: createUserMutation.mutateAsync,
    ...createUserMutation,
  }
}

export const useUpdateProfile = () => {
  const updateUserMutation = useMutation({
    mutationKey: [ENTITIES.profiles],
    // need to remove the email from the user object before updating because is not part of the profile table but we're mapping it in the select function above
    mutationFn: async ({
      email: _,
      ...user
    }: ProfileUpdate & {
      email: string
    }) => await httpClient.update('profiles', user),
    onSuccess: async ({ id: userId }) =>
      invalidateQueries([ENTITIES.profiles, { userId }]),
  })

  return {
    updateProfile: updateUserMutation.mutateAsync,
    ...updateUserMutation,
  }
}
