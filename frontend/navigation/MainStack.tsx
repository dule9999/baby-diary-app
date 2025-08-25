import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Baby } from '@sharedTypes'
import BabiesHomeScreen from '@screens/BabiesHomeScreen'
import BabyScreen from '@screens/BabyScreen'
import AddBabyScreen from '@screens/AddBabyScreen'
import DiaryScreen from '@screens/DiaryScreen'
import NewEntryScreen from '@screens/NewEntryScreen'
import EntryDetailScreen from '@screens/EntryDetailScreen'
import ProfileScreen from '@screens/ProfileScreen'

export type RootStackParamList = {
  BabiesHome: undefined
  AddBaby: undefined
  Baby: { baby: Baby }
  Diary: { newEntry?: string } | undefined
  NewEntry: undefined
  EntryDetail: { entryId: string }
  Profile: undefined
};

const AppStack = createNativeStackNavigator<RootStackParamList>()

export function MainNavigator() {
  return (
    <AppStack.Navigator initialRouteName="BabiesHome" screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="BabiesHome" component={BabiesHomeScreen} />
      <AppStack.Screen name="Baby" component={BabyScreen} />
      <AppStack.Screen
        name="AddBaby"
        component={AddBabyScreen}
        options={{
          presentation: 'transparentModal',
          animation: 'slide_from_bottom',
        }}
      />
      <AppStack.Screen name="Diary" component={DiaryScreen} />
      <AppStack.Screen
        name="NewEntry"
        component={NewEntryScreen}
        options={{
          presentation: 'transparentModal',
          animation: 'slide_from_bottom',
        }}
      />
      <AppStack.Screen name="EntryDetail" component={EntryDetailScreen} />
      <AppStack.Screen name="Profile" component={ProfileScreen} />
    </AppStack.Navigator>
  )
}