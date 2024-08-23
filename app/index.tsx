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
    <ScrollableWrapper innerClassValue="items-center">
      <View className="mt-5">
        <PunchesIcon />

        <ThemedText classValue="text-center font-pbold text-3xl">
          {t('welcome.title')}&nbsp;
          <Text className="text-secondary-200">{t('welcome.subtitle')}</Text>
        </ThemedText>
        <Image
          className="absolute -bottom-2 -right-8 h-[15px] w-[136px]"
          resizeMode="contain"
          source={images.path}
        />
      </View>
      <ThemedText classValue="mt-7 text-center font-pregular text-sm text-black dark:text-gray-100">
        {t('welcome.description')}
      </ThemedText>

      <ThemedButton
        containerClass="w-full mt-9"
        title={t('welcome.cta.continueWithEmail')}
        onPress={() => {
          router.push('/sign-in')
        }}
      />
    </ScrollableWrapper>
  )
}

export default HomePage
