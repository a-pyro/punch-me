import { router } from 'expo-router'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { useSession } from '@/context/session'

import { ThemedButton, ThemedText } from '../../common'

export const DraftHomeView = () => {
  const { t } = useTranslation()
  const { profile: user } = useSession()
  return (
    <View className="flex-1 justify-center">
      <ThemedText classValue="pt-5" style="title">
        <Trans
          defaults="Welcome, {{name}}!"
          i18nKey="home.welcome"
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- strings can be empty
          values={{ name: user.full_name || user.email }}
        />
      </ThemedText>

      <View className="flex">
        <ThemedButton
          outerClassValue="rounded-2xl flex-col"
          onPress={() => {
            router.push({
              pathname: '/stores/[id]/create',
              params: { id: 'new' },
            })
          }}
        >
          <ThemedText classValue="text-center" style="subtitle">
            {t('home.create_store')}
          </ThemedText>
        </ThemedButton>

        <ThemedButton
          outerClassValue="rounded-2xl"
          onPress={() => {
            router.push('/stores')
          }}
        >
          <ThemedText style="subtitle">
            {t('home.subscribe_to_store')}
          </ThemedText>
        </ThemedButton>
      </View>
    </View>
  )
}
