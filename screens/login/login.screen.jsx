import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput, Checkbox } from 'react-native-paper';
import styled from 'styled-components';
import { SafeArea } from '../../components/safeArea/safeArea.component';
import { auth } from '../../firebase/firebase';
import * as SecureStore from 'expo-secure-store';
import { addMonths } from 'date-fns';
import { colors } from '../../theme/colors';
import { useSelector } from 'react-redux';

const LoginContainer = styled(View)`
  flex: 1;
  padding: ${(props) => props.theme.size[3]};
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const LoginEmailInput = styled(TextInput)`
  margin-top: ${(props) => props.theme.size[6]};
  margin-bottom: ${(props) => props.theme.size[2]};
`;
const LoginPasswordInput = styled(TextInput)`
  margin-bottom: ${(props) => props.theme.size[2]};
`;
const LoginButton = styled(Button)`
  width: ${(props) => props.theme.size[7]};
  margin-top: ${(props) => props.theme.size[4]}
  margin-left: auto;
  margin-right: auto;
  background-color: ${(props) => props.theme.colors.primaryBlue};
`;

const StayLoggedInText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.main};
`;

// eslint-disable-next-line react/prop-types
export const LoginScreen = ({ setIsLoggedIn, infoLoading }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const userInfo = useSelector((state) => state.user);
  // console.log(userInfo);

  const onLoginEmailChange = (email) => {
    if (
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setEmailInvalid(false);
    } else {
      setEmailInvalid(true);
    }
    setLoginEmail(email);
  };

  //Saving to Secure Store
  const secureSave = async (key, value) => {
    await SecureStore.setItemAsync(key, value)
      .then(() => {
        console.log('Store Saved');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginClick = async () => {
    if (
      loginEmail !== '' &&
      loginPassword !== '' &&
      !emailInvalid &&
      !loggingIn
    ) {
      setLoggingIn(true);
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then(async (userCredential) => {
          const user = userCredential.user;
          let expirationDate = new Date().toString();
          if (stayLoggedIn) {
            const newExpiration = addMonths(new Date(), 1);
            expirationDate = newExpiration.toString();
          }
          await secureSave('userUid', user.uid);
          await secureSave('expiration', expirationDate);
          setLoggingIn(false);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.log(error);
          setLoggingIn(false);
        });
    } else {
      console.log('Fill in all fields');
    }
  };

  return (
    <SafeArea>
      <LoginContainer>
        <LoginEmailInput
          label={'Email'}
          mode={'outlined'}
          value={loginEmail}
          onChangeText={(text) => onLoginEmailChange(text)}
          outlineColor={colors.primaryBlue}
          activeOutlineColor={colors.primaryBlue}
          error={emailInvalid}
        />
        <LoginPasswordInput
          label={'Password'}
          mode={'outlined'}
          right={
            showPassword ? (
              <TextInput.Icon
                name={'eye'}
                onPress={() => setShowPassword(false)}
              />
            ) : (
              <TextInput.Icon
                name={'eye-off'}
                onPress={() => setShowPassword(true)}
              />
            )
          }
          secureTextEntry={!showPassword}
          value={loginPassword}
          onChangeText={(text) => setLoginPassword(text)}
          outlineColor={colors.primaryBlue}
          activeOutlineColor={colors.primaryBlue}
        />
        <Row>
          <Checkbox
            color={colors.primaryBlue}
            uncheckedColor={colors.primaryBlue}
            status={stayLoggedIn ? 'checked' : 'unchecked'}
            onPress={() => setStayLoggedIn(!stayLoggedIn)}
          />
          <StayLoggedInText>Stay Logged In</StayLoggedInText>
        </Row>

        <LoginButton
          mode="contained"
          onPress={loginClick}
          loading={loggingIn || infoLoading}
        >
          Login
        </LoginButton>
      </LoginContainer>
    </SafeArea>
  );
};
