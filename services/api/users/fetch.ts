import { useMutation } from '@tanstack/react-query'

import { type User, type UserCreate } from '@/supabase/types'

import { httpClient } from '../http-client'

type UserCreateResponse = {
  user: User
  token: string
}

export const createUser = async (
  user: UserCreate,
): Promise<UserCreateResponse> => {
  const { data } = await httpClient.create<UserCreateResponse, UserCreate>(
    '/users',
    user,
  )
  return data
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
  return data
}

export const useUserMutation = () => {
  const createUserMutation = useMutation({
    mutationKey: ['users'],
    mutationFn: createUser,
  })

  const loginUserMutation = useMutation({
    mutationKey: ['users'],
    mutationFn: loginUser,
  })

  return {
    createUserMutation,
    loginUserMutation,
  }
}
