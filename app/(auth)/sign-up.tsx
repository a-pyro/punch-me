import { router } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Alert } from 'react-native'

import { AuthForm, type SignUpFormState } from '@/components'
import { createUser } from '@/lib'

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = useCallback(
    async ({ userName, email, password }: SignUpFormState) => {
      // sanitize the form data

      const sanitizedEmail = email.trim().toLowerCase()
      const sanitizedPassword = password.trim()
      const sanitizedUserName = userName.trim()
      try {
        setIsSubmitting(true)

        // create a new user
        await createUser({
          email: sanitizedEmail,
          password: sanitizedPassword,
          userName: sanitizedUserName,
        })

        router.push('/home')
      } catch (error) {
        Alert.alert('Error', (error as { message: string }).message)
      } finally {
        setIsSubmitting(false)
      }
    },
    [],
  )

  return (
    <AuthForm
      formType="signup"
      isLoading={isSubmitting}
      onSubmit={handleSubmit}
    />
  )
}

export default SignUp
