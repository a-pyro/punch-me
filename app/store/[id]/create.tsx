import React from 'react'
import { useTranslation } from 'react-i18next'

import { ScrollableWrapper, ThemedText, ThemedView } from '@/components'
import { StoreForm } from '@/components/store'
import { useUser } from '@/services'

const StoreCreateView = () => {
  const { t } = useTranslation()
  const { user } = useUser()
  if (!user) return null

  return (
    <ThemedView classValue="p-2">
      <ScrollableWrapper>
        <ThemedText style="title">{t('store.create')}</ThemedText>
        <StoreForm action="create" />
      </ScrollableWrapper>
    </ThemedView>
  )
}

export default StoreCreateView
