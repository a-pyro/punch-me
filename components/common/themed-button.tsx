import { type ClassValue } from 'clsx'
import React from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'

import { type WithouterClassValueValue, cn } from '@/utils'

import { ThemedText } from './themed-text'

export type CustomButtonProps = {
  title: string
  onPress?: () => void
  textClass?: ClassValue
  isLoading?: boolean
} & WithouterClassValueValue

export const ThemedButton = ({
  title,
  onPress,
  isLoading,
  outerClassValue: outerClassValueValue,
  textClass,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      className={cn(
        'mt-5 flex rounded-xl bg-secondary-200 px-6 py-3',
        outerClassValueValue,
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
          {title}
        </ThemedText>
      )}
    </TouchableOpacity>
  )
}
