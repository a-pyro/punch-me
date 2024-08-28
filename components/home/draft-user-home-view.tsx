import { router } from 'expo-router'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { useUser } from '@/services'

import { ThemedButton, ThemedText } from '../common'

export const DraftUserHomeView = () => {
  const { t } = useTranslation()
  const { user } = useUser()
  if (!user) return null
  return (
    <View className="flex-1 justify-center">
      <ThemedText classValue="pt-5" style="title">
        <Trans
          defaults="Welcome, {{name}}!"
          i18nKey="home.welcome"
          values={{ name: user.display_name ?? user.email }}
        />
      </ThemedText>

      <View className="flex">
        <ThemedButton
          outerClassValue="rounded-2xl flex-col"
          onPress={() => {
            router.push('/store')
          }}
        >
          <ThemedText classValue="text-center" style="subtitle">
            {t('home.create_store')}
          </ThemedText>
          {/* <ThemedText>{t('home.create_store_description')}</ThemedText> */}
        </ThemedButton>

        <ThemedButton
          outerClassValue="rounded-2xl"
          onPress={() => {
            router.push('/subscribe')
          }}
        >
          <ThemedText style="subtitle">
            {t('home.subscribe_to_store')}
          </ThemedText>
          {/* <ThemedText>{t('home.subscribe_to_store_description')}</ThemedText> */}
        </ThemedButton>
      </View>
    </View>
  )
}
