import React from 'react'

import { ScrollableWrapper, ThemedText } from '@/components'
import { MOCK_LIST } from '@/mock'

const HomeView = () => {
  return (
    <ScrollableWrapper>
      {/* <FlatList
        ListHeaderComponent={<ListHeader />}
        className="px-5"
        data={MOCK_LIST}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text>{`${item.title} - ${item.description}`}</Text>
        )}
      /> */}
      {MOCK_LIST.map((item) => (
        <ThemedText
          key={item.$id}
        >{`${item.title} - ${item.description}`}</ThemedText>
      ))}
    </ScrollableWrapper>
  )
}

export default HomeView
