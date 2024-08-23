import React, { type PropsWithChildren } from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { type WithInnerClassValue, cn } from '@/utils'

import { ThemedView } from './themed-view'

type ScrollableWrapperProps = WithInnerClassValue

export const ScrollableWrapper = ({
  children,
  innerClassValue,
}: PropsWithChildren<ScrollableWrapperProps>) => {
  return (
    <SafeAreaView className="flex-1 justify-center bg-white px-4 py-4 dark:bg-primary">
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles -- shut up
        contentContainerStyle={{
          flexGrow: 1,
          width: '100%',
        }}
      >
        <ThemedView classValue={cn('flex-1', innerClassValue)}>
          {children}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  )
}
