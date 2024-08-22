import { Redirect, router } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'

import {
  PunchesIcon,
  ScrollableWrapper,
  ThemedButton,
  ThemedText,
} from '@/components'
import { images } from '@/constants'
import { useUser } from '@/services'

const HomePage = () => {
  const { user } = useUser()

  if (user) return <Redirect href="/home" />

  return (
    <ScrollableWrapper innerViewClass="items-center" statusBarStyle="light">
      <PunchesIcon />

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

      <ThemedButton
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
