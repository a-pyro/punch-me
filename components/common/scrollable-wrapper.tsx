import React, { type PropsWithChildren } from 'react'
import { ScrollView } from 'react-native'

import { type WithInnerClassValue } from '@/utils'

type ScrollableWrapperProps = WithInnerClassValue

export const ScrollableWrapper = ({
  children,
}: PropsWithChildren<ScrollableWrapperProps>) => {
  return (
    <ScrollView
      // eslint-disable-next-line react-native/no-inline-styles -- shut up
      contentContainerStyle={{
        flexGrow: 1,
        width: '100%',
      }}
    >
      {children}
    </ScrollView>
  )
}
