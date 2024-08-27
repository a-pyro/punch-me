import React from 'react'

import {
  DraftUserHomeView,
  ScrollableWrapper,
  StoreOwnerHomeView,
} from '@/components'
import { useUser } from '@/services'

const HomeView = () => {
  const { user } = useUser()
  const { role } = user
  return (
    <ScrollableWrapper>
      {role === 'draft' && <DraftUserHomeView />}
      {role === 'store_owner' && <StoreOwnerHomeView />}
    </ScrollableWrapper>
  )
}

export default HomeView
