import { Stack } from 'expo-router'
import React from 'react'

const PunchcardsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]/edit"
        options={{
          headerStyle: {
            backgroundColor: '#161622',
          },
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="[id]/create"
        options={{
          headerStyle: {
            backgroundColor: '#161622',
          },
          presentation: 'modal',
          headerTitle: '',
        }}
      />
    </Stack>
  )
}

export default PunchcardsLayout
