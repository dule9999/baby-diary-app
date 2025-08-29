import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

interface LoaderProps {
  size?: 'small' | 'large'
  color?: string
  testID?: string
}

export const Loader: React.FC<LoaderProps> = ({ size = 'large', color = '#4F46E5', testID }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} testID={testID} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})