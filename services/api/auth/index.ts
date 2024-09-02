import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Alert } from 'react-native'

import { type Profile, supabaseClient } from '@/supabase'

export type AuthAction = 'signin' | 'signup'

export type AuthFormState = {
  email: string
  password: string
}

const signInWithPassword = async ({ email, password }: AuthFormState) => {
  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  })

  if (error) Alert.alert(error.message)
}

const signUpWithEmail = async ({ email, password }: AuthFormState) => {
  const {
    data: { session },
    error,
  } = await supabaseClient.auth.signUp({
    email,
    password,
  })

  if (error) Alert.alert(error.message)
  if (!session) Alert.alert('Please check your inbox for email verification!')
}

const signinWithStoreAccount = async () => {
  const email = process.env.EXPO_PUBLIC_STORE_ACCOUNT_EMAIL
  const password = process.env.EXPO_PUBLIC_STORE_ACCOUNT_PASSWORD
  if (!email || !password) {
    Alert.alert('No store account found!')
    return
  }
  await signInWithPassword({ email, password })
}

const signinWithCustomerAccount = async () => {
  const email = process.env.EXPO_PUBLIC_CUSTOMER_ACCOUNT_EMAIL
  const password = process.env.EXPO_PUBLIC_CUSTOMER_ACCOUNT_PASSWORD
  if (!email || !password) {
    Alert.alert('No customer account found!')
    return
  }
  await signInWithPassword({ email, password })
}

export const useAuthMutation = () => {
  const [authAction, setAuthAction] = useState<AuthAction>('signin')

  const mutation = useMutation({
    mutationFn: authAction === 'signin' ? signInWithPassword : signUpWithEmail,
  })
  return {
    ...mutation,
    authAction,
    setAuthAction,
  }
}

export const useDevAuthMutation = () => {
  const mutation = useMutation({
    mutationFn: async (role: Profile['role']) => {
      if (role === 'store_owner') {
        await signinWithStoreAccount()
      } else {
        await signinWithCustomerAccount()
      }
    },
  })
  return mutation
}
