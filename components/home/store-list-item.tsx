import { router } from 'expo-router'

import { type Store } from '@/supabase'

import { ThemedButton, ThemedText } from '../common'

export const StoreListItem = ({ store }: { store: Store }) => {
  return (
    <ThemedButton
      onPress={() => {
        router.push({
          pathname: '/stores/[id]/view',
          params: { id: store.id },
        })
      }}
    >
      <ThemedText style="subtitle">{store.name}</ThemedText>
    </ThemedButton>
  )
}
