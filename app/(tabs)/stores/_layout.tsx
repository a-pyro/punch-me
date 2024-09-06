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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerSearchBarOptions: {
            placeholder: 'Search for stores',
            onChangeText: (e) => {
              console.log(e.nativeEvent.text)
            },
          },
          headerTitle: '',
        }}
      />
    </Stack>
  )
}

export default StoreStackLayout
