import React, { type PropsWithChildren } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'

export const KeyboardAvoidingComponent = ({ children }: PropsWithChildren) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      keyboardVerticalOffset={100}
    >
      {children}
    </KeyboardAvoidingView>
  )
}
