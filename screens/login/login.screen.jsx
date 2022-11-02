import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import styled from 'styled-components';
import { SafeArea } from '../../components/safeArea/safeArea.component';
import { auth } from '../../firebase/firebase';
import { loginWithEmail } from '../../services/firebaseUtils/login.firebase';
import { UserContext } from '../../services/userContext/user.context';
import { colors } from '../../theme/colors';

const LoginContainer = styled(View)`
  flex: 1;
  padding: ${(props) => props.theme.size[3]};
`;

const LoginEmailInput = styled(TextInput)`
  margin-top: ${(props) => props.theme.size[6]};
  margin-bottom: ${(props) => props.theme.size[2]};
`;
const LoginPasswordInput = styled(TextInput)`
  margin-bottom: ${(props) => props.theme.size[4]};
`;
const LoginButton = styled(Button)`
  width: ${(props) => props.theme.size[7]};
  margin-left: auto;
  margin-right: auto;
  background-color: ${(props) => props.theme.colors.primaryBlue};
`;

// eslint-disable-next-line react/prop-types
export const LoginScreen = ({ setIsLoggedIn }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

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

  const loginClick = async () => {
    if (
      loginEmail !== '' &&
      loginPassword !== '' &&
      !emailInvalid &&
      !loggingIn
    ) {
      console.log('test');
      setLoggingIn(true);
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
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
        <LoginButton mode="contained" onPress={loginClick} loading={loggingIn}>
          Login
        </LoginButton>
      </LoginContainer>
    </SafeArea>
  );
};
