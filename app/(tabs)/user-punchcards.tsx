import React from 'react'
import { useTranslation } from 'react-i18next'

import { SafeView, ThemedText } from '@/components'

const PunchcardsView = () => {
  const { t } = useTranslation()
  return (
    <SafeView>
      <ThemedText classValue="pt-5" style="giant">
        {t('punchcards.list')}
      </ThemedText>
    </SafeView>
  )
}

export default PunchcardsView
