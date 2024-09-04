import { router } from 'expo-router'
import React from 'react'

import { SafeView, ThemedButton, ThemedText } from '@/components'
import { useSession } from '@/context/session'

const ProfileView = () => {
  const { profile: user, signOut } = useSession()

  return (
    <SafeView>
      <ThemedText>{user.email}</ThemedText>
      <ThemedButton
        title="Logout"
        onPress={async () => {
          await signOut()
          router.navigate('/')
        }}
      />
    </SafeView>
  )
}

export default ProfileView
