import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterScreen from '@screens/Auth/RegisterScreen';
import { useAuth } from '@contexts';
import * as services from '@services';
import { Alert } from 'react-native';

jest.mock('@contexts', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@services', () => ({
  register: jest.fn(),
}));

const navigation = { navigate: jest.fn() } as any;

describe('RegisterScreen', () => {
  const loginMock = jest.fn();
  const registerMock = services.register as jest.Mock;

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ login: loginMock });
    jest.clearAllMocks();
  });

  it('renders inputs and buttons', () => {
    const { getByPlaceholderText, getByText } = render(<RegisterScreen navigation={navigation} />);
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('Back to Login')).toBeTruthy();
  });

  it('updates input values', () => {
    const { getByPlaceholderText } = render(<RegisterScreen navigation={navigation} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Username'), 'tester');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');

    expect(getByPlaceholderText('Email').props.value).toBe('test@example.com');
    expect(getByPlaceholderText('Username').props.value).toBe('tester');
    expect(getByPlaceholderText('Password').props.value).toBe('123456');
  });

  it('calls register and login on Sign Up press', async () => {
    registerMock.mockResolvedValueOnce(undefined);
    loginMock.mockResolvedValueOnce(undefined);

    const { getByText, getByPlaceholderText } = render(<RegisterScreen navigation={navigation} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'user@example.com');
    fireEvent.changeText(getByPlaceholderText('Username'), 'username');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');

    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledWith('user@example.com', 'password', 'username');
      expect(loginMock).toHaveBeenCalledWith('user@example.com', 'password');
    });
  });

  it('shows alert if registration fails', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    registerMock.mockRejectedValueOnce(new Error('Email already exists'));

    const { getByText, getByPlaceholderText } = render(<RegisterScreen navigation={navigation} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'user@example.com');
    fireEvent.changeText(getByPlaceholderText('Username'), 'username');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');

    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Register failed', 'Email already exists');
    });
  });

  it('shows alert if login after registration fails', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    registerMock.mockResolvedValueOnce(undefined);
    loginMock.mockRejectedValueOnce(new Error('Invalid login'));

    const { getByText, getByPlaceholderText } = render(<RegisterScreen navigation={navigation} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'user@example.com');
    fireEvent.changeText(getByPlaceholderText('Username'), 'username');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');

    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Could not log in after registration');
    });
  });

  it('navigates back to Login screen', () => {
    const { getByText } = render(<RegisterScreen navigation={navigation} />);
    fireEvent.press(getByText('Back to Login'));
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });
});
