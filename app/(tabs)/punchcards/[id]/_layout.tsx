import { Stack } from 'expo-router'
import React from 'react'

const PunchcardsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="edit"
        options={{
          headerStyle: {
            backgroundColor: '#161622',
          },
          headerTitle: '',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerStyle: {
            backgroundColor: '#161622',
          },
          headerTitle: '',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="view"
        options={{
          headerStyle: {
            backgroundColor: '#161622',
          },
          headerTitle: '',
          presentation: 'modal',
        }}
      />
    </Stack>
  )
}

export default PunchcardsLayout
