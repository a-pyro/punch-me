import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { FlatList, View } from 'react-native'

import { useGetStores } from '@/services'

import { Icon, LoadingScreen, ThemedButton } from '../common'
import { ThemedText } from '../common/themed-text'

import { StoreListItem } from './store-list-item'

export const StoreOwnerHomeView = () => {
  const { stores, isLoading } = useGetStores()
  const { t } = useTranslation()

  if (isLoading) return <LoadingScreen />

  return (
    <FlatList
      data={stores}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <StoreListItem store={item} />}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={
        <ThemedButton
          onPress={() => {
            router.push('/store/new/create')
          }}
        >
          <View className="flex-1 flex-row">
            <Icon color="#fff" name="pluscircle" />
            {/* <ThemedText style="subtitle">{t('home.create_store')}</ThemedText> */}
          </View>
        </ThemedButton>
      }
      ListHeaderComponent={
        <ThemedText style="title">{t('home.store_list')}</ThemedText>
      }
    />
  )
}
