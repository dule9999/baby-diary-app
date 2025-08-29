import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterScreen from '@screens/Auth/RegisterScreen';
import { useAuth } from '@contexts';
import * as services from '@services';
import { useSnackStore } from '@stores';

// Mock contexts and services
jest.mock('@contexts', () => ({ useAuth: jest.fn() }));
jest.mock('@services', () => ({ register: jest.fn() }));
jest.mock('@stores', () => {
  const actual = jest.requireActual('@stores');
  return { ...actual, useSnackStore: jest.fn() };
});

describe('RegisterScreen', () => {
  const loginMock = jest.fn();
  const registerMock = services.register as jest.Mock;
  const mockShowSnack = jest.fn();
  const navigation = { navigate: jest.fn() } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ login: loginMock });
    (useSnackStore as unknown as jest.Mock).mockReturnValue({ showSnack: mockShowSnack });
  });

  const renderScreen = () => render(<RegisterScreen navigation={navigation} />);

  it('renders inputs and buttons', () => {
    const { getByPlaceholderText, getByText } = renderScreen();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('Back to Login')).toBeTruthy();
  });

  it('updates input values', () => {
    const { getByPlaceholderText } = renderScreen();
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

    const { getByText, getByPlaceholderText } = renderScreen();
    fireEvent.changeText(getByPlaceholderText('Email'), 'user@example.com');
    fireEvent.changeText(getByPlaceholderText('Username'), 'username');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');

    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledWith('user@example.com', 'password', 'username');
      expect(loginMock).toHaveBeenCalledWith('user@example.com', 'password');
      expect(mockShowSnack).toHaveBeenCalledWith(expect.any(String), expect.any(String));
    });
  });

  it('shows error snack if registration fails', async () => {
    registerMock.mockRejectedValueOnce(new Error('Email already exists'));

    const { getByText, getByPlaceholderText } = renderScreen();
    fireEvent.changeText(getByPlaceholderText('Email'), 'user@example.com');
    fireEvent.changeText(getByPlaceholderText('Username'), 'username');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');

    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(mockShowSnack).toHaveBeenCalledWith(expect.stringContaining('failed'), expect.any(String));
    });
  });

  it('shows error snack if login after registration fails', async () => {
    registerMock.mockResolvedValueOnce(undefined);
    loginMock.mockRejectedValueOnce(new Error('Invalid login'));

    const { getByText, getByPlaceholderText } = renderScreen();
    fireEvent.changeText(getByPlaceholderText('Email'), 'user@example.com');
    fireEvent.changeText(getByPlaceholderText('Username'), 'username');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');

    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(mockShowSnack).toHaveBeenCalledWith(expect.stringContaining('Could not log in'), expect.any(String));
    });
  });

  it('navigates back to Login screen', () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText('Back to Login'));
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });
});
