import { router } from 'expo-router'
import React from 'react'

import { AuthForm, SafeView, type SigninFormState } from '@/components'
import { useUser } from '@/services'

const SignInView = () => {
  const { signInUser, isPending } = useUser()
  const handleSubmit = async ({ email, password }: SigninFormState) => {
    await signInUser({ email, password })
    router.push('/home')
  }
  return (
    <SafeView>
      <AuthForm
        formType="signin"
        isLoading={isPending}
        onSubmit={handleSubmit}
      />
    </SafeView>
  )
}

export default SignInView
