import { Stack } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'

const StoreStackLayout = () => {
  const { t } = useTranslation()

  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
      }}
    >
      <Stack.Screen
        name="create"
        options={{
          headerTitle: t('store.create'),
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          headerTitle: t('store.edit'),
        }}
      />
      <Stack.Screen
        name="view"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default StoreStackLayout
