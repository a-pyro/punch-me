import { Redirect, router } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

  if (user) return <Redirect href="/home" />

  return (
    <ScrollableWrapper innerClassValue="pb-7">
      <View className="relative flex-1 justify-center">
        <PunchesIcon />
        <ThemedText classValue="text-center font-pbold text-3xl">
          {t('welcome.title')}&nbsp;
          <Text className="text-secondary-200">{t('welcome.subtitle')}</Text>
        </ThemedText>
        <Image
          className="absolute -right-9 h-[15px] w-[136px]"
          resizeMode="contain"
          source={images.path}
        />
        <ThemedText classValue="mt-7 text-center font-pregular text-sm text-black dark:text-gray-100">
          {t('welcome.description')}
        </ThemedText>
      </View>

      <ThemedButton
        outerClassValue="w-full"
        title={t('welcome.cta.continueWithEmail')}
        onPress={() => {
          router.push('/sign-in')
        }}
      />
    </ScrollableWrapper>
  )
}

export default HomePage
