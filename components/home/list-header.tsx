import React from 'react'
import { Text, View } from 'react-native'

import { SearchInput } from '../form/search-input'

export const ListHeader = () => (
  <View className="my-6 flex space-y-6 px-4">
    <View className="mb-6 flex flex-row items-start justify-between">
      <View>
        <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
        <Text className="font-psemibold text-2xl text-white">
          Rn First Contact
        </Text>
      </View>
    </View>

    <SearchInput initialQuery="asd" />
  </View>
)
