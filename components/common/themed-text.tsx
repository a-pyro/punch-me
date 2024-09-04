import { type PropsWithChildren } from 'react'
import { Text } from 'react-native'

import { type WithClassValue, cn } from '@/utils'

const textStyles = {
  default: 'text-base font-pregular',
  defaultSemiBold: 'text-base font-psemibold',
  link: 'text-primary text-base font-pmedium',
  subtitle: 'text-xl font-pbold',
  title: 'text-4xl font-pextrabold',
  giant: 'text-6xl font-pextrabold',
}

export type TextStyle = keyof typeof textStyles

type ThemedTextProps = PropsWithChildren<WithClassValue> & {
  style?: TextStyle
}

export const ThemedText = ({
  children,
  classValue,
  style: textStyle = 'default',
}: ThemedTextProps) => {
  return (
    <Text className={cn('text-white', textStyles[textStyle], classValue)}>
      {children}
    </Text>
  )
}
