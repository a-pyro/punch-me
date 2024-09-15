import { Stack } from 'expo-router'

const StoresLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="index"
        options={{
          headerSearchBarOptions: {
            placeholder: 'Search for stores',
          },
        }}
      />
    </Stack>
  )
}

export default StoresLayout
