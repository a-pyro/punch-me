import { type ClassValue } from 'clsx'
import React, { PropsWithChildren } from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'

import { type WithouterClassValue, cn } from '@/utils'

import { ThemedText } from './themed-text'

export type ThemedButtonProps = {
  title?: string
  onPress?: () => void
  textClass?: ClassValue
  isLoading?: boolean
} & WithouterClassValue

export const ThemedButton = ({
  title,
  onPress,
  isLoading,
  outerClassValue,
  children,
  textClass,
}: PropsWithChildren<ThemedButtonProps>) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      className={cn(
        'mt-5 flex rounded-xl bg-secondary-200 px-6 py-3',
        outerClassValue,
        isLoading && 'opacity-50',
      )}
      onPress={onPress}
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
