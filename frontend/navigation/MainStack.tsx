import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Baby } from '@sharedTypes'
import HomeScreen from '@screens/Home'
import BabyScreen from '@screens/Home/baby/BabyScreen'
import AddBabyScreen from '@screens/Home/AddBabyScreen'
import DiaryScreen from '@screens/Home/baby/diary/DiaryScreen'
import NewEntryScreen from '@screens/Home/baby/diary/NewEntryScreen'
import EntryDetailScreen from '@screens/Home/baby/diary/EntryDetailScreen'
import ProfileScreen from '@screens/Home/ProfileScreen'

export type RootStackParamList = {
  Home: undefined
  AddBaby: undefined
  Baby: { baby: Baby }
  Diary: { baby: Baby }
  NewEntry: { baby: Baby }
  EntryDetail: { babyId: string, entryId: string }
  Profile: undefined
};

const AppStack = createNativeStackNavigator<RootStackParamList>()

export function MainNavigator() {
  return (
    <AppStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={HomeScreen} />
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