import { router, usePathname } from 'expo-router'
import { useState } from 'react'
import { Alert, TextInput, TouchableOpacity, View } from 'react-native'

import { Icon } from '../common/icon'

type SearchInputProps = {
  initialQuery?: string
}

export const SearchInput = ({ initialQuery }: SearchInputProps) => {
  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery ?? '')

  return (
    <View className="flex h-16 w-full flex-row items-center space-x-4 rounded-2xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary">
      <TextInput
        className="mt-0.5 flex-1 font-pregular text-base text-white"
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        value={query}
        onChangeText={(e) => {
          setQuery(e)
        }}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === '') {
            Alert.alert(
              'Missing Query',
              'Please input something to search results across database',
            )
            return
          }

          if (pathname.startsWith('/search')) router.setParams({ query })
          else router.push(`/search/${query}`)
        }}
      >
        <Icon color="#CDCDE0" name="search1" />
      </TouchableOpacity>
    </View>
  )
}
