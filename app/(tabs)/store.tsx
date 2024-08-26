import React from 'react'
import { useTranslation } from 'react-i18next'

import { ScrollableWrapper, ThemedText } from '@/components'
import { StoreCreateForm } from '@/components/store'
import { useUser } from '@/services'

const CreateView = () => {
  const { t } = useTranslation()
  const {
    user: { role },
  } = useUser()
  const title = role === 'draft' ? t('store.create') : t('store.edit')
  return (
    <ScrollableWrapper>
      <ThemedText textStyle="title">{title}</ThemedText>
      <StoreCreateForm />
    </ScrollableWrapper>
  )
}

export default CreateView
