import { Link, Stack } from 'expo-router'

import { ThemedText, ThemedView } from '@/components'

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
