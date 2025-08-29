import React from 'react';
import { render } from '@testing-library/react-native';
import { ScreenWrapper } from '@components';
import { Text } from 'react-native';

describe('ScreenWrapper Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <ScreenWrapper>
        <Text>Test Child</Text>
      </ScreenWrapper>
    );

    expect(getByText('Test Child')).toBeTruthy();
  });

  it('applies custom styles correctly', () => {
    const customStyle = { paddingHorizontal: 20 };
    const { getByTestId } = render(
      <ScreenWrapper testID="screen-wrapper" style={customStyle}>
        <Text>Child</Text>
      </ScreenWrapper>
    );

    const wrapper = getByTestId('screen-wrapper');

    // flatten styles for checking
    const mergedStyles = Array.isArray(wrapper.props.style)
      ? Object.assign({}, ...wrapper.props.style)
      : wrapper.props.style;

    expect(mergedStyles).toMatchObject(customStyle);
  });

  it('passes additional props to the container View', () => {
    const { getByTestId } = render(
      <ScreenWrapper testID="screen-wrapper" accessible accessibilityLabel="wrapper">
        <Text>Child</Text>
      </ScreenWrapper>
    );

    const wrapper = getByTestId('screen-wrapper');

    expect(wrapper.props.accessible).toBe(true);
    expect(wrapper.props.accessibilityLabel).toBe('wrapper');
  });
});
