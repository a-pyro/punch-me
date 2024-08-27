import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'

import { useGetStores } from '@/services'
import { type Store } from '@/supabase'

import { Icon, ThemedButton } from '../common'
import { ThemedText } from '../common/themed-text'

export const StoreOwnerHomeView = () => {
  const { stores, isLoading } = useGetStores()
  const { t } = useTranslation()

  if (isLoading) return <ThemedText>Loading...</ThemedText>

  return (
    <FlatList
      data={stores}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <StoreCard store={item} />}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={
        <ThemedButton>
          <Icon color="#fff" name="pluscircle" />
          <ThemedText style="subtitle">{t('stores.add_store')}</ThemedText>
        </ThemedButton>
      }
      ListHeaderComponent={
        <ThemedText style="title">{t('home.store_list')}</ThemedText>
      }
    />
  )
}

const StoreCard = ({ store }: { store: Store }) => {
  return (
    <ThemedButton>
      <ThemedText style="subtitle">{store.name}</ThemedText>
    </ThemedButton>
  )
}
