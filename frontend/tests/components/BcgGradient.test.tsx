import React from 'react';
import { render } from '@testing-library/react-native';
import { BcgGradient } from '@components';
import { SharedValue } from 'react-native-reanimated';

describe('BcgGradient Component', () => {
  it('renders correctly with required props', () => {
    const progress = { value: 0 } as SharedValue<number>;
    const colorsStart: [string, string] = ['#FFD6E0', '#B3E5FC'];
    const colorsEnd: [string, string] = ['#FFB6C1', '#81D4FA'];

    const { getByTestId } = render(
      <BcgGradient
        testID="bg-gradient"
        progress={progress}
        colorsStart={colorsStart}
        colorsEnd={colorsEnd}
      />
    );

    const gradientWrapper = getByTestId('bg-gradient');
    expect(gradientWrapper).toBeTruthy();
  });
});
