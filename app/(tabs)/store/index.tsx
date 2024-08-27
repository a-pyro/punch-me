import React from 'react'
import { useTranslation } from 'react-i18next'

import { SafeView, ScrollableWrapper, ThemedText } from '@/components'
import { StoreCreateForm } from '@/components/store'
import { useUser } from '@/services'

const CreateView = () => {
  const { t } = useTranslation()
  const {
    user: { role },
  } = useUser()
  const title = role === 'draft' ? t('store.create') : t('store.edit')
  return (
    <SafeView>
      <ScrollableWrapper>
        <ThemedText style="title">{title}</ThemedText>
        <StoreCreateForm />
      </ScrollableWrapper>
    </SafeView>
  )
}

export default CreateView
