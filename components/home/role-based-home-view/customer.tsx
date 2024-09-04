import React from 'react'

import { useSession } from '@/context/session'

import { ThemedText } from '../../common/themed-text'

export const CustomerHomeView = () => {
  const { profile: user } = useSession()
  return <ThemedText>{user.full_name}</ThemedText>
}
