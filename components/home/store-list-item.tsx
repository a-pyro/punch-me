import { Link } from 'expo-router'

import { type Store } from '@/supabase'

import { ThemedButton } from '../common'

export const StoreListItem = ({ store }: { store: Store }) => {
  return (
    <Link
      asChild
      className="block rounded-lg p-4"
      href={{
        pathname: '/stores/[id]/view',
        params: { id: store.id },
      }}
    >
      <ThemedButton>{store.name}</ThemedButton>
    </Link>
  )
}
