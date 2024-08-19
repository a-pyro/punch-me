import { Redirect, router } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'

import { ScrollableWrapper, ThemedButtom, ThemedText } from '@/components'
import { HelloWave } from '@/components/expo-defaults/hello-wave'
import { images } from '@/constants'
import { useUserContext } from '@/context'

const HomePage = () => {
  const { isLogged, loading } = useUserContext()

  if (!loading && isLogged) return <Redirect href="/home" />
  return (
    <ScrollableWrapper innerViewClass="items-center" statusBarStyle="light">
      <HelloWave />

      <View className="mt-5">
        <ThemedText classValue="text-center text-3xl font-pbold">
          Punch Your&nbsp;
          <Text className="text-secondary-200">Customers</Text>
        </ThemedText>
        <Image
          className="absolute -bottom-2 -right-8 h-[15px] w-[136px]"
          resizeMode="contain"
          source={images.path}
        />
      </View>
      <ThemedText classValue="mt-7 text-center font-pregular text-sm text-gray-100">
        Punch Your Way to Perks: Every Tap Packs a Rewarding Punch!
      </ThemedText>

      <ThemedButtom
        containerClass="w-full"
        title="Continue with email"
        onPress={() => {
          router.push('/sign-in')
        }}
      />
    </ScrollableWrapper>
  )
}

export default HomePage
