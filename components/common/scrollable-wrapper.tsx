import { type StatusBarStyle } from 'expo-status-bar'
import React, { type PropsWithChildren } from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { type WithInnerClassValue, cn } from '@/utils'

import { AppStatusBar } from '../app-status-bar'

import { ThemedView } from './themed-view'

type ScrollableWrapperProps = {
  statusBarStyle?: StatusBarStyle
} & WithInnerClassValue

export const ScrollableWrapper = ({
  children,
  innerClassValue,
  statusBarStyle,
}: PropsWithChildren<ScrollableWrapperProps>) => {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 dark:bg-primary">
      <ScrollView>
        <ThemedView classValue={cn('flex-1', innerClassValue)}>
          {children}
        </ThemedView>
      </ScrollView>
      <AppStatusBar style={statusBarStyle} />
    </SafeAreaView>
  )
}
