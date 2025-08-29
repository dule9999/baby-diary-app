import { render, fireEvent, waitFor } from '@testing-library/react-native'
import React from 'react'
import ProfileScreen from '@screens/Home/ProfileScreen'
import { useSnackStore } from '@stores'
import { useAuth } from '@contexts'

const mockNavigation: any = { navigate: jest.fn(), goBack: jest.fn() }
const mockRoute: any = { params: {} }

// ✅ Properly mock Zustand store
jest.mock('@stores', () => {
  const actual = jest.requireActual('@stores')
  return {
    ...actual,
    useSnackStore: jest.fn(),
  }
})

// ✅ Mock auth context
jest.mock('@contexts', () => ({
  useAuth: jest.fn(),
}))

jest.mock('@hooks', () => ({
  useGoBack: () => jest.fn(),
}))

describe('ProfileScreen', () => {
  const mockShowSnack = jest.fn()
  const mockLogout = jest.fn()

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()

    ;(useSnackStore as unknown as jest.Mock).mockReturnValue({
      showSnack: mockShowSnack,
    })

    ;(useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
      user: { username: 'testuser', email: 'test@example.com', avatarUrl: null },
    })
  })

  it('renders user info', () => {
    const { getByText } = render(<ProfileScreen navigation={mockNavigation} route={mockRoute} />)

    expect(getByText('testuser')).toBeTruthy()
    expect(getByText('test@example.com')).toBeTruthy()
  })

  it('calls logout and shows success snack', async () => {
    mockLogout.mockResolvedValueOnce(undefined)

    const { getByText } = render(<ProfileScreen navigation={mockNavigation} route={mockRoute} />)
    fireEvent.press(getByText('Log Out'))

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled()
      expect(mockShowSnack).toHaveBeenCalledWith(
        expect.stringContaining('You have logged out.'),
        expect.any(String)
      )
    })
  })

  it('shows error snack if logout fails', async () => {
    mockLogout.mockRejectedValueOnce(new Error('fail'))

    const { getByText } = render(<ProfileScreen navigation={mockNavigation} route={mockRoute} />)
    fireEvent.press(getByText('Log Out'))

    await waitFor(() => {
      expect(mockShowSnack).toHaveBeenCalledWith(
        expect.stringContaining('fail'),
        expect.any(String)
      )
    })
  })
})
