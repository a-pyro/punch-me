import { useLocalSearchParams } from 'expo-router'
import React from 'react'

import { ScrollableWrapper, ThemedText } from '@/components'
import { type WithId, useGetStore } from '@/services'

const StoreDetailView = () => {
  const { id } = useLocalSearchParams<WithId>()
  const { store } = useGetStore(id)
  return (
    <ScrollableWrapper>
      <ThemedText style="title">Store Detail</ThemedText>
    </ScrollableWrapper>
  )
}

export default StoreDetailView
