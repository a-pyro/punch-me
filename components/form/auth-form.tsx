import { Link } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text } from 'react-native'

import { ScrollableWrapper } from '../common'
import { ThemedButton } from '../common/themed-button'
import { ThemedText } from '../common/themed-text'
import { ThemedView } from '../common/themed-view'

import { FormField } from './form-field'

type FormType = 'signin' | 'signup'

export type SigninFormState = {
  email: string
  password: string
  formType: Extract<FormType, 'signin'>
}

export type SignUpFormState = {
  email: string
  password: string
  userName: string
  formType: Extract<FormType, 'signup'>
}
type FormState = SigninFormState | SignUpFormState

type AuthFormProps<TFormType extends FormType> = {
  formType: TFormType
  onSubmit: (
    form: TFormType extends 'signin' ? SigninFormState : SignUpFormState,
  ) => void
  isLoading: boolean
}

export const AuthForm = <TFormType extends FormType>({
  formType,
  onSubmit,
  isLoading,
}: AuthFormProps<TFormType>) => {
  const [form, setForm] = useState<FormState>(
    formType === 'signin'
      ? { email: '', password: '', formType: 'signin' }
      : { email: '', password: '', userName: '', formType: 'signup' },
  )

  const handleSubmit = () => {
    if (
      (form.formType === 'signin' && (!form.email || !form.password)) ||
      (form.formType === 'signup' &&
        (!form.email || !form.password || !form.userName))
    ) {
      Alert.alert('Please fill in all fields')
      return
    }

    onSubmit(
      form as TFormType extends 'signin' ? SigninFormState : SignUpFormState,
    )
  }

  return (
    <ScrollableWrapper innerClassValue="justify-center">
      <ThemedText classValue="font-psemibold text-2xl font-semibold text-white">
        {formType === 'signin' ? 'Sign in to Punch Me' : 'Sign up for Punch Me'}
      </ThemedText>
      {form.formType === 'signup' && (
        <FormField
          title="Username"
          type="text"
          value={form.userName}
          wrapperViewClassName="mt-5"
          handleChange={(value) => {
            setForm({ ...form, userName: value })
          }}
        />
      )}
      <FormField
        keyboardType="email-address"
        title="Email"
        type="text"
        value={form.email}
        wrapperViewClassName="mt-5"
        handleChange={(value) => {
          setForm({ ...form, email: value })
        }}
      />
      <FormField
        title="Password"
        type="password"
        value={form.password}
        wrapperViewClassName="mt-5"
        handleChange={(value) => {
          setForm({ ...form, password: value })
        }}
      />
      <ThemedButton
        isLoading={isLoading}
        outerClassValue="my-7"
        title={formType === 'signin' ? 'Log in' : 'Sign up'}
        onPress={handleSubmit}
      />
      <ThemedView classValue="flex flex-row items-center justify-center">
        <ThemedText classValue="mr-1">
          {formType === 'signin'
            ? 'Dont have an account?'
            : 'Already have an account?'}
        </ThemedText>
        <Link
          className="font-psemibold text-lg text-secondary"
          href={formType === 'signin' ? '/sign-up' : '/sign-in'}
        >
          <Text>{formType === 'signin' ? 'Sign up' : 'Sign in'} </Text>
        </Link>
      </ThemedView>
    </ScrollableWrapper>
  )
}
