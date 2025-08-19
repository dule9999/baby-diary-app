import React from 'react'
import { Pressable, Text, StyleSheet, PressableProps, ViewStyle, StyleProp } from 'react-native'

interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string
  style?: StyleProp<ViewStyle>
}

const Button: React.FC<ButtonProps> = ({ title, style, ...props }) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
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

export default Button
