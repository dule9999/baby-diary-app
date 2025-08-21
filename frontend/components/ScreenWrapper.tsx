import React from 'react'
import { SafeAreaView, StyleSheet, View, ViewProps } from 'react-native'

interface ScreenWrapperProps extends ViewProps {
  children: React.ReactNode
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, style, ...props }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, style]} {...props}>
        {children}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
})