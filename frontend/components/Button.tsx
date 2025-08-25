import React from 'react'
import { Pressable, Text, StyleSheet, PressableProps, ViewStyle, StyleProp } from 'react-native'

interface ButtonProps extends Omit<PressableProps, 'style'> {
  text?: string
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ text, style, children, ...props }) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && styles.pressed,
      ]}
    >
      {children ?? <Text style={styles.text}>{text}</Text>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center'
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})