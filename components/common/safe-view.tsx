/* eslint-disable react-native/no-inline-styles -- need for insets */
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ThemedView, type ThemedViewProps } from './themed-view'

const ADDITIONAL_HORIZONTAL_PADDING = 10
const ADDITIONAL_VERTICAL_PADDING = 10

export type SafeViewProps = {
  disableInsets?: boolean
} & ThemedViewProps

/* https://reactnavigation.org/docs/handling-safe-area/ */

export const SafeView = ({
  children,
  disableInsets,
  classValue,
}: SafeViewProps) => {
  const internalInsets = useSafeAreaInsets()
  const insets = disableInsets
    ? { top: 0, bottom: 0, left: 0, right: 0 }
    : internalInsets

  return (
    <ThemedView
      classValue={classValue}
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
