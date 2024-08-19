/* eslint-disable react-native/no-raw-text -- react compo */
import { ThemedText, ThemedView } from '@/components'
import { Link, Stack } from 'expo-router'

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView>
        <ThemedText>This screen doesn&apos;t exist.</ThemedText>
        <Link href="/">
          <ThemedText>Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  )
}

export default NotFoundScreen
