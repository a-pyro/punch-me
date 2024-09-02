import { Link, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { Icon, LoadingScreen, SafeView, ThemedText } from '@/components'
import { type WithId } from '@/services'
import { useGetPunchcard } from '@/services/api/punchcards'

// TODO - Add the rest of punchcard information and fix ui

const PunchcardDetailView = () => {
  const { id } = useLocalSearchParams<WithId>()
  const { punchcard, isLoading } = useGetPunchcard(id)
  const [t] = useTranslation()

  if (isLoading) return <LoadingScreen />
  if (!punchcard) return null

  return (
    <SafeView disableInsets>
      <View className="flex-row items-center justify-between">
        <ThemedText style="title">{punchcard.name}</ThemedText>
        <Link
          href={{
            pathname: '/punchcards/[id]/edit',
            params: { id },
          }}
        >
          <Icon name="edit" outerClassValue="pr-3" />
        </Link>
      </View>
      <ThemedText style="defaultSemiBold">
        {t('punchcards.detail.punches_needed')}
      </ThemedText>
      <ThemedText style="subtitle">{punchcard.punches_needed}</ThemedText>
      <ThemedText classValue="mt-4" style="default">
        {punchcard.description}
      </ThemedText>
    </SafeView>
  )
}

export default PunchcardDetailView
