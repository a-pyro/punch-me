import { router } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Pressable, Text, View } from 'react-native'

import {
  type AuthFormState,
  useAuthMutation,
  useDevAuthMutation,
} from '@/services/api'
import { isDev } from '@/utils'

import { ThemedButton } from '../common/themed-button'
import { ThemedText } from '../common/themed-text'
import { ThemedView } from '../common/themed-view'
import { ControlledFormField } from '../form'

export const AuthForm = () => {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<AuthFormState>()
  const { mutateAsync, isPending, authAction, setAuthAction } =
    useAuthMutation()
  useDevAuthMutation
  const { mutateAsync: signInDev } = useDevAuthMutation()
  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data)
    router.replace('/home')
  })

  const onDevSignIn = async (role: 'store_owner' | 'customer') => {
    await signInDev(role)
    router.replace('/home')
  }
  return (
    // <KeyboardAvoidingComponent>
    <View className="flex-1 justify-center">
      <ThemedText classValue="font-psemibold text-2xl font-semibold text-white">
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
        <>
          <ThemedButton
            title="Sign in with store account"
            onPress={() => onDevSignIn('store_owner')}
          />
          <ThemedButton
            title="Sign in with customer account"
            onPress={() => onDevSignIn('customer')}
          />
        </>
      )}
    </View>
    // </KeyboardAvoidingComponent>
  )
}
