import React from 'react'

import { useProfile } from '@/services/api/profiles'

import { ThemedText } from '../common/themed-text'

export const CustomerHomeView = () => {
  const { profile: user } = useProfile()
  if (!user) return null
  return <ThemedText>{user.display_name}</ThemedText>
}
