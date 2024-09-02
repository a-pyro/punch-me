import { Link, router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { type WithId } from '@/services'
import { useGetPunchcards } from '@/services/api/punchcards'

import {
  LoadingScreen,
  ScrollableWrapper,
  ThemedButton,
  ThemedText,
  ThemedView,
} from '../common'

export const StorePunchcards = () => {
  const { id: storeId } = useLocalSearchParams<WithId>()
  const { punchcards, isLoading } = useGetPunchcards(storeId)
  const { t } = useTranslation()

  if (isLoading) return <LoadingScreen />

  return (
    <ScrollableWrapper>
      {punchcards.map((punchcard) => (
        <ThemedView
          key={punchcard.id}
          className="mb-2 rounded-xl border border-gray-700 p-2"
        >
          <Link
            href={{
              pathname: '/punchcards/[id]/view',
              params: { id: punchcard.id },
            }}
          >
            <ThemedText key={punchcard.id}>{punchcard.name}</ThemedText>
          </Link>
        </ThemedView>
      ))}
      <ThemedButton
        outerClassValue="mt-auto"
        onPress={() => {
          router.push({
            pathname: '/punchcards/[id]/create',
            params: { id: storeId },
          })
        }}
      >
        {t('store_detail.create_new_punchcard')}
      </ThemedButton>
    </ScrollableWrapper>
  )
}
