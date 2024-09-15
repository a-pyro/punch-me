import React from 'react'

import { ScrollableWrapper, ThemedView } from '@/components'
import { StoreForm } from '@/components/store'

const StoreEditView = () => {
  return (
    <ThemedView classValue="p-2">
      <ScrollableWrapper>
        <StoreForm operation="update" />
      </ScrollableWrapper>
    </ThemedView>
  )
}

export default StoreEditView
