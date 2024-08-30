import React from 'react'

import { SafeView, ThemedButton, ThemedText } from '@/components'
import { useUser } from '@/services'

const ProfileView = () => {
  const { user, signOut } = useUser()

  return (
    <SafeView>
      <ThemedText>{user.email}</ThemedText>
      <ThemedButton
        title="Logout"
        onPress={async () => {
          // TODO fix this typing

          await signOut()
        }}
      />
    </SafeView>
  )
}

export default ProfileView
