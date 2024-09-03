import { Stack } from 'expo-router'
import React from 'react'

const PunchcardsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#161622',
        },
        presentation: 'modal',
        headerTitle: '',
      }}
    >
      <Stack.Screen name="edit" />
      <Stack.Screen name="create" />
      <Stack.Screen name="view" />
    </Stack>
  )
}

export default PunchcardsLayout
