import { create } from 'zustand'
import { SnackEnum } from '@components'

interface SnackState {
  message: string
  type: SnackEnum
  visible: boolean
  showSnack: (msg: string, type: SnackEnum) => void
  hideSnack: () => void
}

export const useSnackStore = create<SnackState>((set) => ({
  message: '',
  type: SnackEnum.Info,
  visible: false,
  showSnack: (msg, type) => set({ message: msg, type, visible: true }),
  hideSnack: () => set({ visible: false }),
}))
