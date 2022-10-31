import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { theme } from './theme';
import {
  useFonts as useRaleway,
  Raleway_400Regular,
} from '@expo-google-fonts/raleway';
import { ThemeProvider } from 'styled-components';
import { UserContextProvider } from './services/userContext/user.context';
import { LoginScreen } from './screens/login/login.screen';
import { HomeScreen } from './screens/home/home.screen';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ProfileScreen } from './screens/profile/profile.sceen';

const TAB_ICON = {
  Home: 'home-outline',
  Profile: 'person-circle-outline',
};

const Tab = createBottomTabNavigator();
const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
  };
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ralewayLoaded] = useRaleway({
    Raleway_400Regular,
  });
  useEffect(() => {
    if (ralewayLoaded && !isLoggedIn) {
      setTimeout(() => {
        console.log('Test');
      }, 3000);
    }
  }, [ralewayLoaded]);

  //Checking for Font Load
  if (!ralewayLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          {isLoggedIn ? (
            <NavigationContainer>
              <Tab.Navigator screenOptions={createScreenOptions}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
              </Tab.Navigator>
            </NavigationContainer>
          ) : (
            <LoginScreen setIsLoggedIn={setIsLoggedIn} />
          )}
        </UserContextProvider>
      </ThemeProvider>
      <StatusBar style="auto" />
    </>
  );
}
