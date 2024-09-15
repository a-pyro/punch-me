import { Link } from 'expo-router'

import { type Store } from '@/supabase'

import { ThemedText } from '../common'

export const StoreListItem = ({ store }: { store: Store }) => {
  return (
    <Link
      className="block rounded-lg bg-white p-4"
      href={{
        pathname: '/stores/[id]/view',
        params: { id: store.id },
      }}
    >
      <ThemedText classValue="text-lg font-semibold text-gray-800">
        {store.name}
      </ThemedText>
    </Link>
  )
}
