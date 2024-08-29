import React from 'react'

import { SafeView, ScrollableWrapper } from '@/components'
import { PunchCardsForm } from '@/components/punchcards/create-form'

//  TODO - implement PunchcardEditView
const PunchcardEditView = () => {
  return (
    <SafeView disableInsets>
      <ScrollableWrapper>
        <PunchCardsForm action="update" />
      </ScrollableWrapper>
    </SafeView>
  )
}

export default PunchcardEditView
