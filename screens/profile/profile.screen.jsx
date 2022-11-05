import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import { SafeArea } from '../../components/safeArea/safeArea.component';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';
import { setIsLoggedIn, setUid } from '../../reduxStore/userSlice';

const TestText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.h4};
`;

const LogoutButton = styled(Button)`
  margin-left: auto;
  margin-right: auto;
  width: 120px;
  margin-top: 40px;
`;

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.user);
  console.log(uid);
  const logoutClick = () => {
    // const dateTest = new Date();
    // console.log(`DATE TEST: ${dateTest}`);
    // const test = dateTest.toISOString();
    // console.log(`ISO STRING: ${test}`);
    // const newTest = new Date(test);
    // console.log(`NEW TEST: ${newTest}`);
    signOut(auth)
      .then(() => {
        console.log('Logout');
        dispatch(setIsLoggedIn(false));
        dispatch(setUid(''));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <SafeArea>
      <TestText>{uid}</TestText>
      <LogoutButton onPress={logoutClick}>Logout</LogoutButton>
    </SafeArea>
  );
};
