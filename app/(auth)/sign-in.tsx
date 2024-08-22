import { router } from 'expo-router'
import React from 'react'

import { AuthForm, type SigninFormState } from '@/components'
import { useUser } from '@/services'

const SignInView = () => {
  const { signInUser, isPending } = useUser()
  const handleSubmit = async ({ email, password }: SigninFormState) => {
    await signInUser({ email, password })
    router.push('/home')
  }
  return (
    <AuthForm formType="signin" isLoading={isPending} onSubmit={handleSubmit} />
  )
}

export default SignInView
