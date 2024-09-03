import React from 'react'

import { HomeViews, SafeView } from '@/components'
import { useSession } from '@/context'

const HomeView = () => {
  const { profile: user } = useSession()

  const { role } = user
  const RoleBasedHomeView = HomeViews[role]
  return (
    <SafeView>
      <RoleBasedHomeView />
    </SafeView>
  )
}

export default HomeView
