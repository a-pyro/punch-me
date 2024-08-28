import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text } from 'react-native'

import { SafeView } from '@/components'
import { type WithId } from '@/services'

const PunchcardCreateView = () => {
  const { id: store_id } = useLocalSearchParams<WithId>()

  return (
    <SafeView disableInsets>
      <Text>PunchcardCreateView</Text>
    </SafeView>
  )
}

export default PunchcardCreateView
