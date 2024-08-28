import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'react-native'

import { type WithId } from '@/services'
import { useGetPunchcards } from '@/services/api/punchcards'

import { LoadingScreen, ScrollableWrapper, ThemedButton } from '../common'

export const StorePunchcards = () => {
  const { id: storeId } = useLocalSearchParams<WithId>()
  const { punchcards, isLoading } = useGetPunchcards(storeId)
  const { t } = useTranslation()
  console.log('🚀 ~ StorePunchcards ~ punchcards:', punchcards)

  if (isLoading) return <LoadingScreen />

  return (
    <ScrollableWrapper>
      {punchcards.map((punchcard) => (
        <Text key={punchcard.id}>{punchcard.name}</Text>
      ))}
      <ThemedButton>{t('store_detail.create_new_punchcard')}</ThemedButton>
    </ScrollableWrapper>
  )
}
