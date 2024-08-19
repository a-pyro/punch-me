import { type PropsWithChildren } from 'react'
import { View, type ViewProps } from 'react-native'

import { type WithClassValue, cn } from '@/lib'

export type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
}

export const ThemedView = ({
  children,
  classValue,
}: PropsWithChildren<WithClassValue>) => {
  return (
    <View className={cn('bg-white dark:bg-primary', classValue)}>
      {children}
    </View>
  )
}
