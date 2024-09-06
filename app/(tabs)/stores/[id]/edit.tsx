import React from 'react'
import { useTranslation } from 'react-i18next'

import { ScrollableWrapper, ThemedText, ThemedView } from '@/components'
import { StoreForm } from '@/components/store'

const StoreEditView = () => {
  const { t } = useTranslation()
  return (
    <ThemedView classValue="p-2">
      <ScrollableWrapper>
        <ThemedText style="title">{t('store.edit')}</ThemedText>
        <StoreForm operation="update" />
      </ScrollableWrapper>
    </ThemedView>
  )
}

export default StoreEditView
