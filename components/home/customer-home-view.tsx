import React from 'react'

import { useUser } from '@/services/api/profiles'

import { ThemedText } from '../common/themed-text'

export const CustomerHomeView = () => {
  const { user } = useUser()
  if (!user) return null
  return <ThemedText>{user.display_name}</ThemedText>
}
