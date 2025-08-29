import React, { useEffect, useState } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native'

export enum SnackType {
  Info = 'info',
  Success = 'success',
  Error = 'error',
}

interface SnackProps {
  message: string
  type?: SnackType
  duration?: number
  onDismiss?: () => void
}

export const Snack: React.FC<SnackProps> = ({ message, type = SnackType.Info, duration = 3000, onDismiss }) => {
  const [visible, setVisible] = useState(true)
  const [opacity] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()

    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false)
        onDismiss?.()
      })
    }, duration)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <Animated.View
      style={[
        styles.snack,
        type === 'success' ? styles.success : type === 'error' ? styles.error : styles.info,
        { opacity },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
      <TouchableOpacity onPress={() => setVisible(false)}>
        <Text style={styles.dismiss}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  snack: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    padding: 14,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
  },
  text: { color: 'white', fontSize: 16, flex: 1 },
  dismiss: { color: 'white', marginLeft: 12, fontWeight: 'bold' },
  success: { backgroundColor: '#4CAF50' },
  error: { backgroundColor: '#F44336' },
  info: { backgroundColor: '#2196F3' },
})