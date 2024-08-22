import { type ClassValue } from 'clsx'
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { icons } from '@/constants'
import { cn } from '@/utils'

type FormFieldProps = {
  title: string
  value: string
  handleChange: (value: string) => void
  wrapperViewClassName?: ClassValue
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'
  placeholder?: string
  type: 'text' | 'password'
}

export const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  handleChange,
  wrapperViewClassName,
  type = 'text',
  placeholder = `Enter your ${title.toLowerCase()}`,
  keyboardType = 'default',
}) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={cn('space-y-2', wrapperViewClassName)}>
      <Text className="font-pmedium text-base text-gray-100">{title}</Text>
      <View className="flex h-16 w-full flex-row items-center rounded-2xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary">
        <TextInput
          className="flex-1 font-psemibold text-base text-white"
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          secureTextEntry={type === 'password' && !showPassword}
          value={value}
          onChangeText={handleChange}
        />

        {type === 'password' && (
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword)
            }}
          >
            <Image
              className="h-6 w-6"
              resizeMode="contain"
              source={!showPassword ? icons.eye : icons.eyeHide}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
