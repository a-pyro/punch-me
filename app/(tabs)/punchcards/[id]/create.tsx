import React from 'react'

import { SafeView, ScrollableWrapper } from '@/components'
import { PunchCardsForm } from '@/components/punchcards/form'

const PunchcardCreateView = () => {
  return (
    <SafeView disableInsets>
      <ScrollableWrapper>
        <PunchCardsForm operation="create" />
      </ScrollableWrapper>
    </SafeView>
  )
}

export default PunchcardCreateView
