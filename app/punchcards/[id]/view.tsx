import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingScreen, SafeView, ThemedText } from '@/components'
import { type WithId } from '@/services'
import { useGetPunchcard } from '@/services/api/punchcards'

const PunchcardDetailView = () => {
  const { id } = useLocalSearchParams<WithId>()
  const { punchcard, isLoading } = useGetPunchcard(id)
  const { t } = useTranslation()

  if (isLoading) return <LoadingScreen />
  if (!punchcard) return null

  return (
    <SafeView disableInsets>
      <ThemedText style="title">
        {t('punchcards.detail.title', { name: punchcard.name })}
      </ThemedText>
      <ThemedText classValue="mt-4" style="subtitle" />
    </SafeView>
  )
}

export default PunchcardDetailView
