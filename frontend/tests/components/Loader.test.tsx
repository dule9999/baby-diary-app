import React from 'react';
import { render } from '@testing-library/react-native';
import { Loader } from '@components';

describe('Loader Component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Loader testID='loader' />);

    const indicator = getByTestId('loader');
    expect(indicator).toBeTruthy();
    expect(indicator.props.size).toBe('large');
    expect(indicator.props.color).toBe('#4F46E5');
  });

  it('renders correctly with custom props', () => {
    const { getByTestId } = render(<Loader size="small" color="#FF0000" testID='loader' />);

    const indicator = getByTestId('loader');
    expect(indicator).toBeTruthy();
    expect(indicator.props.size).toBe('small');
    expect(indicator.props.color).toBe('#FF0000');
  });
});
