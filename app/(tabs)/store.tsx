import React from 'react'

import { ScrollableWrapper, ThemedText } from '@/components'
import { StoreCreateForm } from '@/components/store'
import { useTranslation } from 'react-i18next'

const CreateView = () => {
  const { t } = useTranslation()

  return (
    <ScrollableWrapper>
      <ThemedText textStyle="title">{t('store.title')}</ThemedText>
      <StoreCreateForm />
    </ScrollableWrapper>
  )
}

export default CreateView
