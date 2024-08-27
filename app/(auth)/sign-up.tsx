import { router } from 'expo-router'
import React, { useCallback } from 'react'

import { AuthForm, SafeView, type SignUpFormState } from '@/components'
import { useCreateUser } from '@/services'

const SignUp = () => {
  const { createUser, isPending } = useCreateUser()

  const handleSubmit = useCallback(
    async ({ userName, email, password }: SignUpFormState) => {
      const sanitizedEmail = email.trim().toLowerCase()
      const sanitizedPassword = password.trim()
      const sanitizedUserName = userName.trim()
      // create a new user
      await createUser({
        email: sanitizedEmail,
        password: sanitizedPassword,
        display_name: sanitizedUserName,
        role: 'draft',
      })
      router.push('/home')
    },
    [createUser],
  )

  return (
    <SafeView>
      <AuthForm
        formType="signup"
        isLoading={isPending}
        onSubmit={handleSubmit}
      />
    </SafeView>
  )
}

export default SignUp
