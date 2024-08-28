import React from 'react'
import { useTranslation } from 'react-i18next'

import { ScrollableWrapper, ThemedText, ThemedView } from '@/components'
import { StoreCreateForm } from '@/components/store'
import { useUser } from '@/services'

const CreateView = () => {
  const { t } = useTranslation()
  const {
    user: { role },
  } = useUser()
  const title = role === 'draft' ? t('store.create') : t('store.edit')
  return (
    <ThemedView classValue="p-2">
      <ScrollableWrapper>
        <ThemedText style="title">{title}</ThemedText>
        <StoreCreateForm />
      </ScrollableWrapper>
    </ThemedView>
  )
}

export default CreateView
