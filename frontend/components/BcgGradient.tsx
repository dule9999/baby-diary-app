import React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, SharedValue, interpolateColor } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

interface BcgGradientProps {
  progress: SharedValue<number>
  colorsStart: [string, string, ...string[]] // tuple type
  colorsEnd: [string, string, ...string[]]
  style?: ViewStyle,
  testID: string,
}

export const BcgGradient: React.FC<BcgGradientProps> = ({ progress, colorsStart, colorsEnd, style, testID }) => {
  const animatedStyle = useAnimatedStyle(() => {
    // interpolate each color individually
    const interpolatedColors = colorsStart.map((startColor, index) =>
      interpolateColor(progress.value, [0, 1], [startColor, colorsEnd[index]])
    )

    return {
      backgroundColor: interpolatedColors[0] // fallback for the container
    }
  })

  return (
    <Animated.View style={[StyleSheet.absoluteFill, animatedStyle, style]}>
      <LinearGradient
        testID={testID}
        colors={colorsStart as unknown as readonly [string, string, ...string[]]}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  )
}
