// jest.setup.js
import 'react-native-gesture-handler/jestSetup';
import 'react-native-reanimated/mock';

// Mock LinearGradient
jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    LinearGradient: (props) => <View {...props} />
  };
});

// Mock Animated.View
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  const React = require('react');
  const { View } = require('react-native');

  // override Animated.View
  Reanimated.default = {
    ...Reanimated.default,
    View: (props) => <View {...props} />
  };

  Reanimated.createAnimatedComponent = (Comp) => Comp;

  return Reanimated;
});
