import { Stack } from 'expo-router'
import React from 'react'

const StoreLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: '#161622',
          },
          headerTitle: 'Home',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerStyle: {
            backgroundColor: '#161622',
          },
          headerTitle: 'Home',
        }}
      />
    </Stack>
  )
}

export default StoreLayout
