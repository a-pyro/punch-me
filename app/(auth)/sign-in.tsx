import { router } from 'expo-router'
import React, { useState } from 'react'
import { Alert } from 'react-native'

import { AuthForm, type SigninFormState } from '@/components'
import { signIn } from '@/lib'

const SignInView = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async ({ email, password }: SigninFormState) => {
    setIsSubmitting(true)
    try {
      await signIn({ email, password })
      router.push('/home')
    } catch (error) {
      Alert.alert('Error signing in', (error as { message: string }).message)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <AuthForm
      formType="signin"
      isLoading={isSubmitting}
      onSubmit={handleSubmit}
    />
  )
}

export default SignInView
