import React from 'react'
import {Text} from 'react-native'
import { render, fireEvent } from '@testing-library/react-native'
import { Button } from '@components'

describe('Button Component', () => {
  it('renders with text prop', () => {
    const { getByText } = render(<Button text="Click me" />);
    expect(getByText('Click me')).toBeTruthy();
  });

  it('renders with children', () => {
    const { getByText } = render(
      <Button>
        <Text>Child Text</Text>
      </Button>
    );
    expect(getByText('Child Text')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button text="Press me" onPress={onPressMock} />);

    const button = getByText('Press me');
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
