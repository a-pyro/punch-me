import React from 'react'

import { DraftUserHomeView, SafeView, StoreOwnerHomeView } from '@/components'
import { CustomerHomeView } from '@/components/home/customer-home-view'
import { useProfile } from '@/services'

const HomeView = () => {
  const { profile: user } = useProfile()
  if (!user) return null
  const { role } = user
  return (
    <SafeView>
      {role === 'draft' && <DraftUserHomeView />}
      {role === 'store_owner' && <StoreOwnerHomeView />}
      {role === 'customer' && <CustomerHomeView />}
    </SafeView>
  )
}

export default HomeView
