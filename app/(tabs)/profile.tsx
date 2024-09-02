import React from 'react'

import { SafeView, ThemedButton, ThemedText } from '@/components'
import { useSession } from '@/context'

const ProfileView = () => {
  const { profile: user, signOut } = useSession()

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
