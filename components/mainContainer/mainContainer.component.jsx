import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../../screens/home/home.screen';
import { LoginScreen } from '../../screens/login/login.screen';
import { ProfileScreen } from '../../screens/profile/profile.screen';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoggedIn, setUid } from '../../reduxStore/userSlice';
import { auth } from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const MainContainer = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [user, loading] = useAuthState(auth);

  /* Signing In */
  useEffect(() => {
    if (auth.currentUser !== null) {
      dispatch(setUid(auth.currentUser.uid));
      dispatch(setIsLoggedIn(true));
    }
  }, [user]);

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
      {auth.currentUser !== null && isLoggedIn ? (
        <NavigationContainer>
          <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <LoginScreen infoLoading={loading} />
      )}
    </>
  );
};
