import { View, type ViewProps } from 'react-native'

import { type WithClassValue, cn } from '@/utils'

export type ThemedViewProps = ViewProps & WithClassValue

export const ThemedView = ({
  children,
  classValue,
  ...rest
}: ThemedViewProps) => {
  return (
    <View className={cn('bg-white dark:bg-primary', classValue)} {...rest}>
      {children}
    </View>
  )
}
