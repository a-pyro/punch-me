import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { FlatList, View } from 'react-native'

import { useGetUserStores } from '@/services'

import { Icon, LoadingScreen, ThemedButton } from '../../common'
import { ThemedText } from '../../common/themed-text'
import { StoreListItem } from '../store-list-item'

export const BusinessHomeView = () => {
  const { stores, isLoading } = useGetUserStores()
  const { t } = useTranslation()
  if (isLoading) return <LoadingScreen />

  return (
    <View>
      <ThemedText classValue="pt-5" style="giant">
        {t('home.store_list')}
      </ThemedText>

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
                  pathname: '/stores/[id]/create',
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
      />
    </View>
  )
}
