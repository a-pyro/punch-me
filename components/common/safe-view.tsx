import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { cn } from '@/utils'

import { type ThemedViewProps } from './themed-view'

export type SafeViewProps = {
  disableInsets?: boolean
} & ThemedViewProps

/* https://reactnavigation.org/docs/handling-safe-area/ */

export const SafeView = ({ children, classValue }: SafeViewProps) => {
  return (
    <SafeAreaView className={cn('flex-1 bg-primary px-3', classValue)}>
      {children}
    </SafeAreaView>
  )
}
