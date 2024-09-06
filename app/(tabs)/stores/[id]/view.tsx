import { Link, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { View } from 'react-native'

import {
  Icon,
  LoadingScreen,
  SafeView,
  ThemedText,
  ThemedView,
} from '@/components'
import { StoreDetailCard, StorePunchcards } from '@/components/store'
import { StoreQRCode } from '@/components/store/qr-code'
import { useSession } from '@/context/session'
import { type WithId, useGetStore } from '@/services'

// TODO - Add the rest of store information and store edit button
const StoreDetailView = () => {
  const { id } = useLocalSearchParams<WithId>()
  const { store, isLoading } = useGetStore({ storeId: id })
  const { profile } = useSession()
  const { t } = useTranslation()

  if (!store || isLoading) return <LoadingScreen />
  return (
    <SafeView disableInsets>
      <ThemedView classValue="flex-row items-center justify-between">
        <ThemedText style="title">
          <Trans
            defaults="Store: {{name}}"
            i18nKey="store_detail.title"
            values={{ name: store.name }}
          />
        </ThemedText>
        <Link
          href={{
            pathname: '/stores/[id]/edit',
            params: { id },
          }}
        >
          <Icon name="edit" />
        </Link>
      </ThemedView>
      <View className="py-3">
        <StoreQRCode storeId={store.id} userId={profile.id} />
      </View>
      <StoreDetailCard store={store} />
      <ThemedText classValue="my-4" style="subtitle">
        {t('store_detail.punchcards')}
      </ThemedText>
      <StorePunchcards />
    </SafeView>
  )
}

export default StoreDetailView
