import { Stack } from 'expo-router'
import React from 'react'

const StoreStackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="create"
        options={{
          headerStyle: {
            backgroundColor: '#161622',
          },
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          headerStyle: {
            backgroundColor: '#161622',
          },
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="view"
        options={{
          headerStyle: {
            backgroundColor: '#161622',
          },
          presentation: 'modal',
        }}
      />
    </Stack>
  )
}

export default StoreStackLayout
