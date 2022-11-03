import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { isAfter } from 'date-fns';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../../screens/home/home.screen';
import { LoginScreen } from '../../screens/login/login.screen';
import { ProfileScreen } from '../../screens/profile/profile.screen';
import { useSelector, useDispatch } from 'react-redux';
import {
  setExpiration,
  setIsLoggedIn,
  setUid,
} from '../../reduxStore/userSlice';

export const MainContainer = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [infoLoading, setInfoLoading] = useState(false);

  /* CHECKING STORED DATA AND VERIFYING */
  useEffect(() => {
    const getSecureValue = async (key) => {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        return result;
      } else {
        console.log('No Value Found');
        return null;
      }
    };
    if (!userData.isLoggedIn) {
      setInfoLoading(true);
      getSecureValue('userUid').then((uid) => {
        if (uid !== null) {
          dispatch(setUid(uid));
          getSecureValue('expiration').then((expiration) => {
            if (expiration !== null) {
              if (isAfter(new Date(expiration), new Date())) {
                console.log('Session Active');
                setInfoLoading(false);
                dispatch(setExpiration(new Date(expiration)));
                dispatch(setIsLoggedIn(true));
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
  }, []);

  /* NAVIGATION ICONS */
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
  return (
    <>
      {userData.isLoggedIn ? (
        <NavigationContainer>
          <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <LoginScreen infoLoading={infoLoading} />
      )}
    </>
  );
};
