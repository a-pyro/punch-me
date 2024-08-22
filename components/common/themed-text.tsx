import { type PropsWithChildren } from 'react'
import { Text } from 'react-native'

import { type WithClassValue, cn } from '@/utils'

const textStyles = {
  default: 'text-base leading-6 font-pregular',
  defaultSemiBold: 'text-base font-psemibold leading-6',
  link: 'text-primary text-base leading-7 font-pmedium',
  subtitle: 'text-xl font-pbold',
  title: 'text-4xl font-pextrabold leading-8',
}

export type TextStyle = keyof typeof textStyles

type ThemedTextProps = PropsWithChildren<WithClassValue> & {
  textStyle?: TextStyle
}

export const ThemedText = ({
  children,
  classValue,
  textStyle = 'default',
}: ThemedTextProps) => {
  return (
    <Text
      className={cn(
        'text-black dark:text-white',
        textStyles[textStyle],
        classValue,
      )}
    >
      {children}
    </Text>
  )
}
