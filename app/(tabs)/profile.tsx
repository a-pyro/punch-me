import { router } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { SafeView, ThemedButton, ThemedText } from '@/components'
import { useSession } from '@/context/session'

const ProfileView = () => {
  const { profile: user, signOut } = useSession()
  const { t } = useTranslation()

  return (
    <SafeView>
      <ThemedText classValue="pt-5" style="giant">
        {t('profile.title')}
      </ThemedText>

      <ThemedText>{user.email}</ThemedText>
      <ThemedButton
        title="Logout"
        onPress={async () => {
          await signOut()
          router.push('/')
        }}
      />
    </SafeView>
  )
}

export default ProfileView
