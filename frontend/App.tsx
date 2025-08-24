import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Baby } from '@sharedTypes';
import LoginScreen from '@screens/LoginScreen';
import RegisterScreen from '@screens/RegisterScreen';
import DiaryScreen from './screens/DiaryScreen';
import NewEntryScreen from './screens/NewEntryScreen';
import EntryDetailScreen from './screens/EntryDetailScreen';
import BabiesHomeScreen from '@screens/BabiesHomeScreen/index';
import BabyScreen from '@screens/BabyScreen';
import AddBabyScreen from '@screens/AddBabyScreen';
import { AuthProvider, useAuth } from '@contexts';

export type RootStackParamList = {
  BabiesHome: undefined;
  AddBaby: undefined;
  Baby: { baby: Baby };
  Diary: { newEntry?: string } | undefined;
  NewEntry: undefined;
  EntryDetail: { entryId: string };
};

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator<RootStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

function MainNavigator() {
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
    </AppStack.Navigator>
  );
}

// Component to switch between AuthNavigator and MainNavigator based on auth state
const AppContent: React.FC = () => {
  const { authed } = useAuth();
  return authed ? <MainNavigator /> : <AuthNavigator />;
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AuthProvider>
  );
}
