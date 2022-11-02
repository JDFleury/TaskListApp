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
import { ProfileScreen } from './screens/profile/profile.screen';
import { isAfter } from 'date-fns';
import * as SecureStore from 'expo-secure-store';

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
  const [infoLoading, setInfoLoading] = useState(false);
  const [ralewayLoaded] = useRaleway({
    Raleway_400Regular,
  });
  useEffect(() => {
    //Function To Grab Secure Data
    const getSecureValue = async (key) => {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        return result;
      } else {
        console.log('No Value Found');
        return null;
      }
    };

    if (ralewayLoaded && !isLoggedIn) {
      setInfoLoading(true);
      getSecureValue('userUid').then((uid) => {
        if (uid !== null) {
          getSecureValue('expiration').then((expiration) => {
            if (expiration !== null) {
              if (isAfter(new Date(expiration), new Date())) {
                console.log('Session Active');
                setInfoLoading(false);
                setIsLoggedIn(true);
              } else {
                console.log('Session Expired');
                setInfoLoading(false);
              }
            }
          });
        } else {
          setInfoLoading(false);
        }
      });
      setInfoLoading(false);
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
            <LoginScreen
              setIsLoggedIn={setIsLoggedIn}
              infoLoading={infoLoading}
            />
          )}
        </UserContextProvider>
      </ThemeProvider>
      <StatusBar style="auto" />
    </>
  );
}
