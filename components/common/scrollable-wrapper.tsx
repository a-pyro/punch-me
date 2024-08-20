import { type ClassValue } from 'clsx'
import { type StatusBarStyle } from 'expo-status-bar'
import React, { type PropsWithChildren } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'

import { cn } from '@/lib'

import { AppStatusBar } from '../app-status-bar'

type ScrollableWrapperProps = {
  innerViewClass?: ClassValue
  statusBarStyle?: StatusBarStyle
}

export const ScrollableWrapper = ({
  children,
  innerViewClass,
  statusBarStyle,
}: PropsWithChildren<ScrollableWrapperProps>) => {
  return (
    <SafeAreaView className="h-full flex-1 bg-white dark:bg-primary">
      <ScrollView>
        <View
          className={cn(
            'min-h-[85vh] w-full justify-center px-4',
            innerViewClass,
          )}
        >
          {children}
        </View>
      </ScrollView>
      <AppStatusBar style={statusBarStyle} />
    </SafeAreaView>
  )
}
