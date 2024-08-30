import React from 'react'
import { Text } from 'react-native'

import { ThemedView } from './themed-view'

export const LoadingScreen = () => {
  return (
    <ThemedView classValue="flex-1">
      <Text>LoadingScreen</Text>
    </ThemedView>
  )
}
