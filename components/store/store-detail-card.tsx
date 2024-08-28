import { Image } from 'react-native'

import { type Store } from '@/supabase'

import { ThemedText, ThemedView } from '../common'

export const StoreDetailCard = ({ store }: { store: Store }) => {
  return (
    <ThemedView classValue="my-2 rounded-lg bg-black-200">
      {!!store.logo_url && (
        <ThemedView className="mb-4 flex items-center">
          <Image
            className="h-24 w-24 rounded-full"
            resizeMode="cover"
            source={{ uri: store.logo_url }}
          />
        </ThemedView>
      )}
      <ThemedText classValue="mb-2 text-center text-xl font-semibold">
        {store.name}
      </ThemedText>
      {!!store.address && (
        <ThemedText classValue="mb-2 text-center text-sm text-gray-500">
          {store.address}
        </ThemedText>
      )}
      {!!store.contact_phone && (
        <ThemedText classValue="mb-2 text-center text-sm text-gray-500">
          Phone: {store.contact_phone}
        </ThemedText>
      )}
      {!!store.contact_email && (
        <ThemedText classValue="mb-2 text-center text-sm text-gray-500">
          Email: {store.contact_email}
        </ThemedText>
      )}
      {!!store.website_url && (
        <ThemedText classValue="text-center text-sm text-blue-500">
          Website: {store.website_url}
        </ThemedText>
      )}
    </ThemedView>
  )
}
