import React from 'react'
import { useTranslation } from 'react-i18next'

import { ScrollableWrapper, ThemedText, ThemedView } from '@/components'
import { StoreForm } from '@/components/store'

const StoreCreateView = () => {
  const { t } = useTranslation()

  return (
    <ThemedView classValue="p-2">
      <ScrollableWrapper>
        <ThemedText style="title">{t('store.create')}</ThemedText>
        <StoreForm operation="insert" />
      </ScrollableWrapper>
    </ThemedView>
  )
}

export default StoreCreateView
