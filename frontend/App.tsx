import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Baby } from '@sharedTypes'
import DiaryScreen from './screens/DiaryScreen'
import NewEntryScreen from './screens/NewEntryScreen'
import EntryDetailScreen from './screens/EntryDetailScreen'
import BabiesHomeScreen from '@screens/BabiesHomeScreen/index'
import BabyScreen from '@screens/BabyScreen'
import AddBabyScreen from '@screens/AddBabyScreen'

export type RootStackParamList = {
  BabiesHome: undefined
  AddBaby: undefined
  Baby: { baby: Baby }
  Diary: { newEntry?: string } | undefined
  NewEntry: undefined
  EntryDetail: { entryId: string }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BabiesHome" screenOptions={{headerShown: false}}>
        <Stack.Screen name="BabiesHome" component={BabiesHomeScreen} />
        <Stack.Screen name="Baby" component={BabyScreen} />
        <Stack.Screen
          name="AddBaby"
          component={AddBabyScreen}
          options={{
            presentation: 'transparentModal',
            animation: 'slide_from_bottom',
          }}
        />
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
