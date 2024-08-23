import React from 'react'
import { Trans } from 'react-i18next'
import { View } from 'react-native'

import { useUser } from '@/services'

import { ThemedButton, ThemedText } from '../common'

export const DraftUserHomeView = () => {
  const { user } = useUser()

  return (
    <View className="flex-1 justify-center">
      <ThemedText classValue="pt-5" textStyle="title">
        <Trans
          defaults="Welcome, {{name}}!"
          i18nKey="home.welcome"
          values={{ name: user.display_name ?? user.email }}
        />
      </ThemedText>
      <View className="flex flex-row justify-between">
        <ThemedButton
          outerClassValue="h-40 rounded-2xl flex-1 justify-center mr-2"
          title="create store"
        />
        <ThemedButton
          outerClassValue="h-40 rounded-2xl flex-1 justify-center ml-2"
          title="search store"
        />
      </View>
    </View>
  )
}
