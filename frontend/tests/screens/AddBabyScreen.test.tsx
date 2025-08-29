// tests/screens/AddBabyScreen.test.tsx
import React from 'react'
import { render } from '@testing-library/react-native'

// Mock all hooks and stores so the component renders safely
jest.mock('@hooks', () => ({
  useGoBack: () => jest.fn(),
}))
jest.mock('@reactquery', () => ({
  useCreateBabyMutation: () => ({ mutate: jest.fn(), isPending: false }),
}))
jest.mock('@stores', () => ({
  useSnackStore: () => ({ showSnack: jest.fn() }),
}))

const mockProps = {
  navigation: {} as any,
  route: {} as any,
}

import AddBabyScreen from '../../screens/Home/AddBabyScreen' // import after mocks

describe('AddBabyScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<AddBabyScreen {...mockProps} />)

    // Check that key inputs/buttons exist
    expect(getByPlaceholderText('Baby Name *')).toBeTruthy()
    expect(getByText('ADD BABY')).toBeTruthy()
  })
})
