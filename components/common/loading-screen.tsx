import React from 'react'

import { ThemedText } from './themed-text'
import { ThemedView } from './themed-view'

// TODO  Implement LoadingScreen and fix hardcoded height (it is wrapped by scroll and the ux is not good)
export const LoadingScreen = () => {
  return (
    <ThemedView classValue="h-[100vh]">
      <ThemedText>LoadingScreen</ThemedText>
    </ThemedView>
  )
}
