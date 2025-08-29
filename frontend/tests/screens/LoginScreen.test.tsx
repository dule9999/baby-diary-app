import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '@screens/Auth/LoginScreen';
import { useAuth } from '@contexts';
import { Alert } from 'react-native';

// Mock the useAuth hook
jest.mock('@contexts', () => ({
  useAuth: jest.fn(),
}));

// Mock navigation prop
const mockNavigate = jest.fn();
const navigation = { navigate: mockNavigate } as any;

describe('LoginScreen', () => {
  const loginMock = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ login: loginMock });
    jest.clearAllMocks();
  });

  it('renders inputs and buttons correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={navigation} />);

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
    expect(getByText('Create Account')).toBeTruthy();
  });

  it('updates state when typing in inputs', () => {
    const { getByPlaceholderText } = render(<LoginScreen navigation={navigation} />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('calls login function on Login button press', async () => {
    loginMock.mockResolvedValueOnce(undefined);
    const { getByText, getByPlaceholderText } = render(<LoginScreen navigation={navigation} />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'user@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');

    fireEvent.press(getByText('Login'));

    await waitFor(() => expect(loginMock).toHaveBeenCalledWith('user@example.com', '123456'));
  });

  it('shows alert on login failure', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    loginMock.mockRejectedValueOnce(new Error('Invalid credentials'));

    const { getByText, getByPlaceholderText } = render(<LoginScreen navigation={navigation} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'user@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');

    fireEvent.press(getByText('Login'));

    await waitFor(() => expect(alertSpy).toHaveBeenCalledWith('Login failed', 'Invalid credentials'));
  });

  it('navigates to Register screen on Create Account press', () => {
    const { getByText } = render(<LoginScreen navigation={navigation} />);
    fireEvent.press(getByText('Create Account'));

    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });
});
