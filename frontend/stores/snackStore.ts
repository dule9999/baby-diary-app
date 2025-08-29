import { create } from 'zustand'
import { SnackType } from '@components'

interface SnackState {
  message: string
  type: SnackType
  visible: boolean
  showSnack: (msg: string, type: SnackType) => void
  hideSnack: () => void
}

export const useSnackStore = create<SnackState>((set) => ({
  message: '',
  type: SnackType.Info,
  visible: false,
  showSnack: (msg, type) => set({ message: msg, type, visible: true }),
  hideSnack: () => set({ visible: false }),
}))
