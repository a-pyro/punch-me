import React from 'react'

import { DraftUserHomeView, ScrollableWrapper } from '@/components'
import { useUser } from '@/services'

const HomeView = () => {
  const { user } = useUser()
  const { role } = user
  return (
    <ScrollableWrapper>
      {role === 'draft' && <DraftUserHomeView />}
    </ScrollableWrapper>
  )
}

export default HomeView
