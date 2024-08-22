import React from 'react'

import { ScrollableWrapper, ThemedButton, ThemedText } from '@/components'
import { useUser } from '@/services'

const ProfileView = () => {
  const { user, logoutUser } = useUser()
  return (
    <ScrollableWrapper>
      <ThemedText>{user?.email}</ThemedText>
      <ThemedButton title="Logout" onPress={logoutUser} />
    </ScrollableWrapper>
  )
}

export default ProfileView
