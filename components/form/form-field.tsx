import { type ClassValue } from 'clsx'
import React, { useState } from 'react'
import {
  Text,
  TextInput,
  type TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native'

import { cn } from '@/utils'

import { Icon } from '../common/icon'

export type FormFieldProps = TextInputProps & {
  title: string
  wrapperViewClassName?: ClassValue
  placeholder?: string
  type?: 'text' | 'password'
  onSubmitEditing?: () => void
}

export const FormField: React.FC<FormFieldProps> = ({
  title,
  wrapperViewClassName,
  type = 'text',
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={cn('space-y-2', wrapperViewClassName)}>
      <Text className="font-pmedium text-base text-gray-100">{title}</Text>
      <View className="flex h-16 w-full flex-row items-center rounded-2xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary">
        <TextInput
          className="flex-1 font-psemibold text-base text-white"
          placeholderTextColor="#7B7B8B"
          secureTextEntry={type === 'password' && !showPassword}
          {...rest}
        />

        {type === 'password' && (
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword)
            }}
          >
            <Icon name={!showPassword ? 'eye' : 'eyeo'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
