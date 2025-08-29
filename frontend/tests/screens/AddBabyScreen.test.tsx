import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react-native'
import { Alert } from 'react-native'
import AddBabyScreen from '@screens/Home/AddBabyScreen'

jest.mock('@reactquery', () => ({
  useCreateBabyMutation: jest.fn(),
}))
import { useCreateBabyMutation } from '@reactquery'

jest.mock('@hooks', () => ({
  useGoBack: () => jest.fn(), // just return a no-op function
}))

const mockAlert = jest.fn()
jest.spyOn(Alert, 'alert').mockImplementation(mockAlert)
jest.spyOn(console, 'error').mockImplementation(() => {})

describe('AddBabyScreen', () => {
  const mutateMock = jest.fn()
  const goBackMock = jest.fn()

  const renderScreen = () =>
    render(
      <AddBabyScreen
        navigation={{ goBack: goBackMock } as any}
        route={{} as any}
      />
    )

  beforeEach(() => {
    ;(useCreateBabyMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
    })
    jest.clearAllMocks()
  })

  it('shows error if baby name is empty', () => {
    renderScreen()
    fireEvent.press(screen.getByText(/ADD BABY/i))
    expect(mockAlert).toHaveBeenCalledWith('Error', 'Baby name is required')
  })

  it('calls mutation with correct data', () => {
    renderScreen()
    fireEvent.changeText(screen.getByPlaceholderText('Baby Name *'), 'John')
    fireEvent.changeText(screen.getByPlaceholderText('Image URL'), 'http://img.com/john.jpg')
    fireEvent.changeText(screen.getByPlaceholderText('Date of Birth (YYYY-MM-DD)'), '2025-08-29')
    fireEvent.changeText(screen.getByPlaceholderText('Blood Group'), 'A+')
    fireEvent.changeText(screen.getByPlaceholderText('Address'), '123 Street')

    fireEvent.press(screen.getByText(/ADD BABY/i))

    expect(mutateMock).toHaveBeenCalledWith(
      {
        name: 'John',
        img: 'http://img.com/john.jpg',
        date_of_birth: '2025-08-29',
        blood_group: 'A+',
        address: '123 Street',
      },
      expect.any(Object)
    )
  })
})
