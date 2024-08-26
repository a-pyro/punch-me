import { type ClassValue } from 'clsx'
import React from 'react'
import {
  ActivityIndicator,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'

import { type WithouterClassValue, cn } from '@/utils'

import { ThemedText } from './themed-text'

export type ThemedButtonProps = TouchableOpacityProps & {
  title?: string
  textClass?: ClassValue
  isLoading?: boolean
} & WithouterClassValue

export const ThemedButton = ({
  title,
  isLoading,
  outerClassValue,
  children,
  textClass,
  ...rest
}: ThemedButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      className={cn(
        'mt-5 flex rounded-xl bg-secondary-200 px-6 py-3',
        outerClassValue,
        isLoading && 'opacity-50',
      )}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color="orange" />
      ) : (
        <ThemedText
          classValue={cn(
            'py-1 text-center text-lg font-semibold text-white dark:text-primary',
            textClass,
          )}
        >
          {title ? title : children}
        </ThemedText>
      )}
    </TouchableOpacity>
  )
}
