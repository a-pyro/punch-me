/* eslint-disable react-native/no-inline-styles -- need this for safe area */
import React, { type PropsWithChildren } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ThemedView } from './themed-view'

const ADDITIONAL_HORIZONTAL_PADDING = 5
const ADDITIONAL_VERTICAL_PADDING = 10

export const SafeView = ({ children }: PropsWithChildren) => {
  const insets = useSafeAreaInsets()
  return (
    <ThemedView
      style={{
        flex: 1,
        // Paddings to handle safe area
        paddingTop: insets.top + ADDITIONAL_VERTICAL_PADDING,
        paddingBottom: insets.bottom + ADDITIONAL_VERTICAL_PADDING,
        paddingLeft: insets.left + ADDITIONAL_HORIZONTAL_PADDING,
        paddingRight: insets.right + ADDITIONAL_HORIZONTAL_PADDING,
      }}
    >
      {children}
    </ThemedView>
  )
}
