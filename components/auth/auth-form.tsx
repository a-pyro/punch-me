import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Alert, Pressable, Text, View } from 'react-native'

import { supabaseClient } from '@/supabase'
import { isDev } from '@/utils'

import { ThemedButton } from '../common/themed-button'
import { ThemedText } from '../common/themed-text'
import { ThemedView } from '../common/themed-view'
import { ControlledFormField } from '../form'

type AuthAction = 'signin' | 'signup'

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

const signInWithDevAccount = async () => {
  const email = process.env.EXPO_PUBLIC_DEV_ACCOUNT_EMAIL
  const password = process.env.EXPO_PUBLIC_DEV_ACCOUNT_PASSWORD
  if (!email || !password) {
    Alert.alert('No dev account found!')
    return
  }
  await signInWithPassword({ email, password })
}

export const useAuthMutation = () => {
  const [authAction, setAuthAction] = useState<AuthAction>('signin')

  let mutationFn
  if (isDev) {
    mutationFn = signInWithDevAccount
  } else if (authAction === 'signin') {
    mutationFn = signInWithPassword
  } else {
    mutationFn = signUpWithEmail
  }

  const mutation = useMutation({
    mutationFn,
  })
  return {
    mutationFn,
    ...mutation,
    authAction,
    setAuthAction,
  }
}

export const AuthForm = () => {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<AuthFormState>()
  const { mutationFn, isPending, authAction, setAuthAction } = useAuthMutation()

  const onSubmit = handleSubmit(async (data) => {
    await mutationFn(data)
    router.replace('/home')
  })

  return (
    // <KeyboardAvoidingComponent>
    <View className="flex-1 justify-center">
      <ThemedText classValue="font-psemibold text-2xl font-semibold text-primary dark:text-white">
        {authAction === 'signin'
          ? t('auth.form.sign_in_title')
          : t('auth.form.sign_up_title')}
      </ThemedText>
      <ControlledFormField
        control={control}
        keyboardType="email-address"
        name="email"
        placeholder={t('auth.form.email_placeholder')}
        title={t('auth.form.email')}
        type="text"
        wrapperViewClassName="mt-5"
        onSubmitEditing={onSubmit}
      />
      <ControlledFormField
        control={control}
        name="password"
        placeholder={t('auth.form.password_placeholder')}
        title={t('auth.form.password')}
        type="password"
        wrapperViewClassName="mt-5"
        onSubmitEditing={onSubmit}
      />
      <ThemedButton
        isLoading={isPending}
        outerClassValue="my-7"
        title={
          authAction === 'signin' ? t('auth.form.login') : t('auth.form.signup')
        }
        onPress={onSubmit}
      />
      <ThemedView classValue="flex flex-row items-center justify-center">
        <ThemedText classValue="mr-1">
          {authAction === 'signin'
            ? t('auth.form.no_account')
            : t('auth.form.have_account')}
        </ThemedText>
        <Pressable
          onPress={() => {
            setAuthAction((prev) => {
              return prev === 'signin' ? 'signup' : 'signin'
            })
          }}
        >
          <Text className="font-psemibold text-lg text-secondary">
            {authAction === 'signin'
              ? t('auth.form.sign_up')
              : t('auth.form.sign_in')}
          </Text>
        </Pressable>
      </ThemedView>
      {!!isDev && (
        <ThemedButton title="Sign in with dev account" onPress={onSubmit} />
      )}
    </View>
    // </KeyboardAvoidingComponent>
  )
}
