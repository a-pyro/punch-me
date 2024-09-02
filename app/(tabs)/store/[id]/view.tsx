import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { SafeView, ThemedText } from '@/components'
import { StoreDetailCard, StorePunchcards } from '@/components/store'
import { type WithId, useGetStore } from '@/services'

// TODO - Add the rest of store information and store edit button
const StoreDetailView = () => {
  const { id } = useLocalSearchParams<WithId>()
  const { store } = useGetStore(id)
  const { t } = useTranslation()

  if (!store) return null
  return (
    <SafeView disableInsets>
      <ThemedText style="title">
        <Trans
          defaults="Store: {{name}}"
          i18nKey="store_detail.title"
          values={{ name: store.name }}
        />
      </ThemedText>
      <StoreDetailCard store={store} />
      <ThemedText classValue="my-4" style="subtitle">
        {t('store_detail.punchcards')}
      </ThemedText>
      <StorePunchcards />
    </SafeView>
  )
}

export default StoreDetailView
