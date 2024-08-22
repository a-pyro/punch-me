import { type ClassValue } from 'clsx'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { cn } from '@/utils'

export type CustomButtonProps = {
  title: string
  onPress?: () => void
  containerClass?: ClassValue
  textClass?: ClassValue
  isLoading?: boolean
}

export const ThemedButtom = ({
  title,
  onPress,
  isLoading,
  containerClass,
  textClass,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      className={cn(
        'mt-5 rounded-xl bg-secondary-200 px-6 py-3',
        containerClass,
        isLoading && 'opacity-50',
      )}
      onPress={onPress}
    >
      <Text
        className={cn(
          'py-1 text-center text-lg font-semibold text-white dark:text-primary',
          textClass,
        )}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}
