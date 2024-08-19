import type { PropsWithChildren, ReactElement } from 'react'
import { useColorScheme } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'

import { ThemedView } from '../common/themed-view'

const HEADER_HEIGHT = 250

type Props = PropsWithChildren<{
  headerImage: ReactElement
  headerBackgroundColor: { dark: string; light: string }
}>

export const ParallaxScrollView = ({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) => {
  const colorScheme = useColorScheme() ?? 'light'
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1],
          ),
        },
      ],
    }
  })

  return (
    <ThemedView classValue="flex-1">
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          className={`h-[250px] overflow-hidden bg-${headerBackgroundColor[colorScheme]}`}
          style={headerAnimatedStyle}
        >
          {headerImage}
        </Animated.View>
        <ThemedView classValue="flex-1 gap-4 overflow-hidden p-8">
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  )
}
