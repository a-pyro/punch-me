import React from 'react'

import { useUser } from '@/services/api/users'

import { ThemedText } from '../common/themed-text'

export const CustomerHomeView = () => {
  const { user } = useUser()
  return <ThemedText>{user.display_name}</ThemedText>
}
