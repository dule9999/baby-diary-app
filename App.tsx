import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import DiaryScreen from './screens/DiaryScreen';
import AddEntryScreen from './screens/AddEntryScreen';
import EntryDetailScreen from './screens/EntryDetailScreen';

export type RootStackParamList = {
  Diary: undefined;
  AddEntry: undefined; 
  EntryDetail: { entryId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Diary">
        <Stack.Screen name="Diary" component={DiaryScreen} />
        <Stack.Screen name="AddEntry" component={AddEntryScreen} />
        <Stack.Screen name="EntryDetail" component={EntryDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
