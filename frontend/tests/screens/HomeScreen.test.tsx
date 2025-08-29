import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HomeScreen from '@screens/Home'

// mock the babies query hook
jest.mock('@reactquery', () => ({
  useBabiesQuery: jest.fn(),
}))
import { useBabiesQuery } from '@reactquery'

const Stack = createNativeStackNavigator()
const queryClient = new QueryClient()

// ✅ Fixed: pass component directly, not an inline function
const renderWithProviders = (Component: React.ComponentType<any>, props: any = {}) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home">
            {() => <Component {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

describe('HomeScreen', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('shows loader while fetching babies', () => {
    ;(useBabiesQuery as jest.Mock).mockReturnValue({ data: [], isLoading: true })

    renderWithProviders(HomeScreen, { navigation: { navigate: jest.fn() }, route: {} })

    expect(screen.getByTestId('loader')).toBeTruthy()
  })

  it('shows empty state when no babies exist', () => {
    ;(useBabiesQuery as jest.Mock).mockReturnValue({ data: [], isLoading: false })

    renderWithProviders(HomeScreen, { navigation: { navigate: jest.fn() }, route: {} })

    expect(screen.getByText(/No babies added currently/i)).toBeTruthy()
  })

  it('renders babies list when data exists', () => {
    const babies = [{ id: '1', name: 'Baby One' }]
    ;(useBabiesQuery as jest.Mock).mockReturnValue({ data: babies, isLoading: false })

    renderWithProviders(HomeScreen, { navigation: { navigate: jest.fn() }, route: {} })

    expect(screen.getByText('Baby One')).toBeTruthy()
  })

  it('navigates to AddBaby when pressing add button', () => {
    const navigateMock = jest.fn()
    ;(useBabiesQuery as jest.Mock).mockReturnValue({ data: [], isLoading: false })

    renderWithProviders(HomeScreen, { navigation: { navigate: navigateMock }, route: {} })

    fireEvent.press(screen.getByTestId('add-baby-btn'))
    expect(navigateMock).toHaveBeenCalledWith('AddBaby')
  })

  it('navigates to Profile when pressing profile button', () => {
    const navigateMock = jest.fn()
    ;(useBabiesQuery as jest.Mock).mockReturnValue({ data: [], isLoading: false })

    renderWithProviders(HomeScreen, { navigation: { navigate: navigateMock }, route: {} })

    fireEvent.press(screen.getByTestId('profile-btn'))
    expect(navigateMock).toHaveBeenCalledWith('Profile')
  })
})
