import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import React from 'react'

import { ScrollableWrapper, ThemedText } from '@/components'

const StoreDetailView = () => {
  const glob = useGlobalSearchParams()
  console.log('🚀 ~ StoreDetailView ~ glob:', glob)
  const local = useLocalSearchParams()
  console.log('🚀 ~ StoreDetailView ~ local:', local)
  return (
    <ScrollableWrapper>
      <ThemedText textStyle="title">Store Detail</ThemedText>
    </ScrollableWrapper>
  )
}

export default StoreDetailView
