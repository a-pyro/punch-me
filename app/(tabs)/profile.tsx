import React from 'react'

import { SafeView, ThemedButton, ThemedText } from '@/components'
import { useUser } from '@/services'

const ProfileView = () => {
  const { user, logoutUser } = useUser()
  return (
    <SafeView>
      <ThemedText>{user.email}</ThemedText>
      <ThemedButton
        title="Logout"
        onPress={async () => {
          await logoutUser()
        }}
      />
    </SafeView>
  )
}

export default ProfileView
