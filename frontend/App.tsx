import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import DiaryScreen from './screens/DiaryScreen'
import NewEntryScreen from './screens/NewEntryScreen'
import EntryDetailScreen from './screens/EntryDetailScreen'

export type RootStackParamList = {
  Diary: { newEntry?: string } | undefined
  NewEntry: undefined
  EntryDetail: { entryId: string }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Diary" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Diary" component={DiaryScreen} />
        <Stack.Screen
          name="NewEntry"
          component={NewEntryScreen}
          options={{
            presentation: 'transparentModal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen name="EntryDetail" component={EntryDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
