import { router } from 'expo-router'
import React, { useCallback } from 'react'

import { AuthForm, type SignUpFormState } from '@/components'
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
    <AuthForm formType="signup" isLoading={isPending} onSubmit={handleSubmit} />
  )
}

export default SignUp
