import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { FlatList, View } from 'react-native'

import { useGetUserStores } from '@/services'

import { Icon, LoadingScreen, ThemedButton } from '../../common'
import { ThemedText } from '../../common/themed-text'
import { StoreListItem } from '../store-list-item'

export const StoreOwnerHomeView = () => {
  const { stores, isLoading } = useGetUserStores()
  const { t } = useTranslation()

  if (isLoading) return <LoadingScreen />

  return (
    <FlatList
      data={stores}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <StoreListItem store={item} />}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={
        stores.length === 0 ? (
          <ThemedButton
            onPress={() => {
              router.push({
                pathname: '/store/[id]/create',
                params: { id: 'new' },
              })
            }}
          >
            <View className="flex-1 flex-row">
              <Icon color="#fff" name="pluscircle" />
            </View>
          </ThemedButton>
        ) : null
      }
      ListHeaderComponent={
        <ThemedText style="title">{t('home.store_list')}</ThemedText>
      }
    />
  )
}
