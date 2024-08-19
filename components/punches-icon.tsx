import React from 'react'
import { Dimensions, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

import { ThemedText } from './common/themed-text'

// Get screen width
const { width } = Dimensions.get('window')

export const PunchesIcon = () => {
  // Calculate start and end positions
  const startPosition = width / 3
  const endPosition = 0 // Center position

  // Shared values for the fist positions
  const leftFistX = useSharedValue(-startPosition)
  const rightFistX = useSharedValue(startPosition)

  // Animate the fists to move towards the center and return to start
  leftFistX.value = withSequence(
    withTiming(endPosition, { duration: 500 }), // Move fists to the center
  )
  rightFistX.value = withSequence(
    withTiming(endPosition, { duration: 500 }), // Move fists to the center
  )

  // Apply the animated styles
  const leftFistStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leftFistX.value }],
  }))

  const rightFistStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: rightFistX.value }],
  }))

  return (
    <View className="flex-row items-center justify-center">
      <Animated.View style={leftFistStyle}>
        <ThemedText classValue="font-pextrabold text-4xl">🤜</ThemedText>
      </Animated.View>
      <Animated.View style={rightFistStyle}>
        <ThemedText classValue="font-pextrabold text-4xl">🤛</ThemedText>
      </Animated.View>
    </View>
  )
}
