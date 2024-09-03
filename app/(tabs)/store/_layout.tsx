import { Stack } from 'expo-router'

const StoreStackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerStyle: {
            backgroundColor: '#161622',
          },
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default StoreStackLayout
