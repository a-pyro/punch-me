import { router } from 'expo-router'

import { type Store } from '@/supabase'

import { ThemedButton, ThemedText } from '../common'

export const StoreListItem = ({ store }: { store: Store }) => {
  return (
    <ThemedButton
      onPress={() => {
        router.push(`/store/${store.id}/view`)
      }}
    >
      <ThemedText style="subtitle">{store.name}</ThemedText>
    </ThemedButton>
  )
}
