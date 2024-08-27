import { Link } from 'expo-router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Text, View } from 'react-native'

import { ThemedButton } from '../common/themed-button'
import { ThemedText } from '../common/themed-text'
import { ThemedView } from '../common/themed-view'
import { FormField } from '../form/form-field'
import { KeyboardAvoidingComponent } from '../form/keyboard-avoiding-view'

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
  const { t } = useTranslation()
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
      Alert.alert(t('auth.form.fill_all_fields'))
      return
    }

    onSubmit(
      form as TFormType extends 'signin' ? SigninFormState : SignUpFormState,
    )
  }

  return (
    <KeyboardAvoidingComponent>
      <View className="flex-1 justify-center">
        <ThemedText classValue="font-psemibold text-2xl font-semibold text-primary dark:text-white">
          {formType === 'signin'
            ? t('auth.form.sign_in_title')
            : t('auth.form.sign_up_title')}
        </ThemedText>
        {form.formType === 'signup' && (
          <FormField
            placeholder={t('auth.form.username_placeholder')}
            title={t('auth.form.username')}
            type="text"
            value={form.userName}
            wrapperViewClassName="mt-5"
            onSubmitEditing={handleSubmit}
            onChangeText={(value) => {
              setForm({ ...form, userName: value })
            }}
          />
        )}
        <FormField
          keyboardType="email-address"
          placeholder={t('auth.form.email_placeholder')}
          title={t('auth.form.email')}
          type="text"
          value={form.email}
          wrapperViewClassName="mt-5"
          onSubmitEditing={handleSubmit}
          onChangeText={(value) => {
            setForm({ ...form, email: value })
          }}
        />
        <FormField
          placeholder={t('auth.form.password_placeholder')}
          title={t('auth.form.password')}
          type="password"
          value={form.password}
          wrapperViewClassName="mt-5"
          onSubmitEditing={handleSubmit}
          onChangeText={(value) => {
            setForm({ ...form, password: value })
          }}
        />
        <ThemedButton
          isLoading={isLoading}
          outerClassValue="my-7"
          title={
            formType === 'signin' ? t('auth.form.login') : t('auth.form.signup')
          }
          onPress={handleSubmit}
        />
        <ThemedView classValue="flex flex-row items-center justify-center">
          <ThemedText classValue="mr-1">
            {formType === 'signin'
              ? t('auth.form.no_account')
              : t('auth.form.have_account')}
          </ThemedText>
          <Link
            className="font-psemibold text-lg text-secondary"
            href={formType === 'signin' ? '/sign-up' : '/sign-in'}
          >
            <Text>
              {formType === 'signin'
                ? t('auth.form.sign_up')
                : t('auth.form.sign_in')}{' '}
            </Text>
          </Link>
        </ThemedView>
      </View>
    </KeyboardAvoidingComponent>
  )
}
