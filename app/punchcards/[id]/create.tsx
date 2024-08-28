import React from 'react'

import { SafeView, ScrollableWrapper } from '@/components'
import { PunchCardsForm } from '@/components/punchcards/create-form'

const PunchcardCreateView = () => {
  return (
    <SafeView disableInsets>
      <ScrollableWrapper>
        <PunchCardsForm action="create" />
      </ScrollableWrapper>
    </SafeView>
  )
}

export default PunchcardCreateView
